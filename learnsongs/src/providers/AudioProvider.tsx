import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SongConfig } from '../types/song';

interface AudioContextValue {
  isAudioReady: boolean;
  audioError: string | null;
  activeWordId: string | null;
  isPlaying: boolean;
  playMode: 'word' | 'line' | 'song';
  audioBuffers: Map<string, AudioBuffer>;
  preloadSongAudio: (song: SongConfig) => Promise<void>;
  playWord: (wordId: string) => void;
  playLine: (wordIds: string[]) => void;
  playSong: (song: SongConfig) => void;
  stopPlayback: () => void;
  setPlayMode: (mode: 'word' | 'line' | 'song') => void;
  resetSongLoading: (songId: string) => void;
  isLoading: boolean;
}

const AudioContext = createContext<AudioContextValue | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

interface AudioProviderProps {
  children: React.ReactNode;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [isAudioReady, setIsAudioReady] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [activeWordId, setActiveWordId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playMode, setPlayMode] = useState<'word' | 'line' | 'song'>('word');
  const [audioBuffers, setAudioBuffers] = useState<Map<string, AudioBuffer>>(new Map());
  const [loadedSongs, setLoadedSongs] = useState<Set<string>>(new Set());
  const [loadingAttempts, setLoadingAttempts] = useState<Map<string, number>>(new Map());
  const [isLoading, setIsLoading] = useState(false);

  // Initialize audio context on user interaction
  useEffect(() => {
    const initAudioContext = async () => {
      try {
        // Check if AudioContext is supported
        if (!(window.AudioContext || (window as any).webkitAudioContext)) {
          throw new Error('Web Audio API не поддерживается в этом браузере');
        }
        
        const context = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        // Wait for the context to be ready
        if (context.state === 'suspended') {
          // Resume on user interaction
          const resumeContext = async () => {
            await context.resume();
            setAudioContext(context);
            setIsAudioReady(true);
            setAudioError(null);
            // Remove event listeners after successful resume
            document.removeEventListener('click', resumeContext);
            document.removeEventListener('touchstart', resumeContext);
            document.removeEventListener('keydown', resumeContext);
          };
          
          // Add event listeners for user interaction
          document.addEventListener('click', resumeContext);
          document.addEventListener('touchstart', resumeContext);
          document.addEventListener('keydown', resumeContext);
        } else {
          setAudioContext(context);
          setIsAudioReady(true);
          setAudioError(null);
        }
      } catch (error) {
        console.error('Failed to initialize AudioContext:', error);
        setAudioError('Не удалось инициализировать аудиосистему: ' + (error as Error).message);
        setIsAudioReady(false);
      }
    };

    initAudioContext();

    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, []);

  // Preload all audio files for a song
  const preloadSongAudio = useCallback(async (song: SongConfig) => {
    console.log('Preloading song audio...', song);
    // Check if song is valid
    if (!song) {
      return;
    }

    // Check if already loading
    if (isLoading) {
      return;
    }

    // Check if song is already loaded
    if (loadedSongs.has(song.id)) {
      return;
    }

    // Check if we've exceeded retry attempts
    const attempts = loadingAttempts.get(song.id) || 0;
    const MAX_ATTEMPTS = 3;
    if (attempts >= MAX_ATTEMPTS) {
      setAudioError(`Не удалось загрузить песню "${song.title}" после ${MAX_ATTEMPTS} попыток`);
      return;
    }

    if (!audioContext || audioContext.state === 'suspended') {
      setAudioError('Аудиосистема не готова');
      return;
    }

    setIsLoading(true);
    try {
      setAudioError(null);
      const newBuffers = new Map(audioBuffers);
      const words = song.lines.flat();
      let loadedCount = 0;
      let errorCount = 0;

      // Update attempts
      const newAttempts = new Map(loadingAttempts);
      newAttempts.set(song.id, attempts + 1);
      setLoadingAttempts(newAttempts);

      const loadPromises = words.map(async (word) => {
        try {
          // Get base URL from environment or use default
          const baseUrl = import.meta.env.BASE_URL || '/learnsongs/dist/';
          // Construct full URL with base URL
          const audioUrl = baseUrl === '' ? word.audio : `${baseUrl}${word.audio}`;
          
          const response = await fetch(audioUrl);
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          const arrayBuffer = await response.arrayBuffer();
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
          newBuffers.set(word.id, audioBuffer);
          loadedCount++;
        } catch (error) {
          console.error(`Failed to load audio for word ${word.id}:`, error);
          errorCount++;
        }
      });

      await Promise.all(loadPromises);
      setAudioBuffers(newBuffers);
      
      if (errorCount > 0) {
        setAudioError(`Не удалось загрузить ${errorCount} из ${words.length} аудиофайлов`);
      } else {
        // Mark song as loaded successfully
        const newLoadedSongs = new Set(loadedSongs);
        newLoadedSongs.add(song.id);
        setLoadedSongs(newLoadedSongs);
        
        // Reset attempts for this song since it loaded successfully
        const newAttempts = new Map(loadingAttempts);
        newAttempts.delete(song.id);
        setLoadingAttempts(newAttempts);
        
        setAudioError(null);
      }
    } catch (error) {
      console.error('Failed to preload audio:', error);
      setAudioError('Не удалось загрузить аудиофайлы');
    } finally {
      setIsLoading(false);
    }
  }, [audioContext, audioBuffers, loadedSongs, loadingAttempts, isLoading]);

  // Play a single word's audio
  const playWord = useCallback((wordId: string) => {
    if (!audioContext || audioContext.state === 'suspended' || !isAudioReady) {
      setAudioError('Аудиосистема не готова');
      return;
    }

    const buffer = audioBuffers.get(wordId);
    if (!buffer) {
      // Try SpeechSynthesis fallback
      if ('speechSynthesis' in window) {
        const wordText = wordId; // Use the wordId as text for now
        const utterance = new SpeechSynthesisUtterance(wordText);
        utterance.lang = 'ru-RU';
        utterance.onerror = (event) => {
          console.error('SpeechSynthesis error:', event);
          setAudioError('Не удалось воспроизвести аудио');
        };
        speechSynthesis.speak(utterance);
      } else {
        setAudioError('Аудиофайл не найден и синтез речи недоступен');
      }
      return;
    }

    setActiveWordId(wordId);
    setIsPlaying(true);

    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.onended = () => {
      setActiveWordId(null);
      setIsPlaying(false);
    };
    source.addEventListener('error', (error) => {
      console.error('Audio playback error:', error);
      setAudioError('Ошибка воспроизведения аудио');
      setActiveWordId(null);
      setIsPlaying(false);
    });
    source.start();
  }, [audioContext, isAudioReady, audioBuffers]);

  // Play a sequence of words
  const playLine = useCallback((wordIds: string[]) => {
    if (!audioContext || audioContext.state === 'suspended' || !isAudioReady) {
      setAudioError('Аудиосистема не готова');
      return;
    }

    setIsPlaying(true);
    
    let currentIndex = 0;
    
    const playNextWord = () => {
      if (currentIndex >= wordIds.length) {
        setActiveWordId(null);
        setIsPlaying(false);
        return;
      }
      
      const wordId = wordIds[currentIndex];
      const buffer = audioBuffers.get(wordId);
      
      if (buffer) {
        setActiveWordId(wordId);
        
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.onended = () => {
          currentIndex++;
          playNextWord();
        };
        source.addEventListener('error', (error) => {
          console.error('Audio playback error:', error);
          currentIndex++;
          playNextWord();
        });
        source.start();
      } else {
        // Try SpeechSynthesis fallback
        if ('speechSynthesis' in window) {
          const wordText = wordId;
          const utterance = new SpeechSynthesisUtterance(wordText);
          utterance.lang = 'ru-RU';
          utterance.onend = () => {
            currentIndex++;
            playNextWord();
          };
          utterance.onerror = (event) => {
            console.error('SpeechSynthesis error:', event);
            currentIndex++;
            playNextWord();
          };
          speechSynthesis.speak(utterance);
        } else {
          currentIndex++;
          playNextWord();
        }
      }
    };
    
    playNextWord();
  }, [audioContext, isAudioReady, audioBuffers]);

  // Play an entire song
  const playSong = useCallback((song: SongConfig) => {
    if (!audioContext || audioContext.state === 'suspended' || !isAudioReady) {
      setAudioError('Аудиосистема не готова');
      return;
    }

    setIsPlaying(true);
    
    let currentLineIndex = 0;
    let currentWordIndex = 0;
    
    const playNextWord = () => {
      if (currentLineIndex >= song.lines.length) {
        setActiveWordId(null);
        setIsPlaying(false);
        return;
      }
      
      if (currentWordIndex >= song.lines[currentLineIndex].length) {
        currentLineIndex++;
        currentWordIndex = 0;
        playNextWord();
        return;
      }
      
      const word = song.lines[currentLineIndex][currentWordIndex];
      const buffer = audioBuffers.get(word.id);
      
      if (buffer) {
        setActiveWordId(word.id);
        
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.onended = () => {
          currentWordIndex++;
          playNextWord();
        };
        source.addEventListener('error', (error) => {
          console.error('Audio playback error:', error);
          currentWordIndex++;
          playNextWord();
        });
        source.start();
      } else {
        // Try SpeechSynthesis fallback
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(word.text);
          utterance.lang = 'ru-RU';
          utterance.onend = () => {
            currentWordIndex++;
            playNextWord();
          };
          utterance.onerror = (event) => {
            console.error('SpeechSynthesis error:', event);
            currentWordIndex++;
            playNextWord();
          };
          speechSynthesis.speak(utterance);
        } else {
          currentWordIndex++;
          playNextWord();
        }
      }
    };
    
    playNextWord();
  }, [audioContext, isAudioReady, audioBuffers]);

  // Stop playback
  const stopPlayback = useCallback(() => {
    setActiveWordId(null);
    setIsPlaying(false);
  }, []);

  // Reset loading state for a song (to allow retrying)
  const resetSongLoading = useCallback((songId: string) => {
    const newLoadedSongs = new Set(loadedSongs);
    newLoadedSongs.delete(songId);
    setLoadedSongs(newLoadedSongs);
    
    const newAttempts = new Map(loadingAttempts);
    newAttempts.delete(songId);
    setLoadingAttempts(newAttempts);
    
    // Also reset any audio error
    setAudioError(null);
  }, [loadedSongs, loadingAttempts]);

  const value = {
    isAudioReady,
    audioError,
    activeWordId,
    isPlaying,
    playMode,
    audioBuffers,
    preloadSongAudio,
    playWord,
    playLine,
    playSong,
    stopPlayback,
    setPlayMode,
    resetSongLoading,
    isLoading
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};