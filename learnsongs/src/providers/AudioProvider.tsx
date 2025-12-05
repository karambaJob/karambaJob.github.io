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

  // Initialize audio context
  useEffect(() => {
    const initAudioContext = async () => {
      try {
        const context = new (window.AudioContext || (window as any).webkitAudioContext)();
        setAudioContext(context);
        setIsAudioReady(true);
        setAudioError(null);
      } catch (error) {
        console.error('Failed to initialize AudioContext:', error);
        setAudioError('Не удалось инициализировать аудиосистему');
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
    if (!audioContext) {
      setAudioError('Аудиосистема не готова');
      return;
    }

    try {
      setAudioError(null);
      const newBuffers = new Map(audioBuffers);
      const words = song.lines.flat();
      let loadedCount = 0;
      let errorCount = 0;

      const loadPromises = words.map(async (word) => {
        try {
          const response = await fetch(word.audio);
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
        setAudioError(null);
      }
    } catch (error) {
      console.error('Failed to preload audio:', error);
      setAudioError('Не удалось загрузить аудиофайлы');
    }
  }, [audioContext, audioBuffers]);

  // Play a single word's audio
  const playWord = useCallback((wordId: string) => {
    if (!audioContext || !isAudioReady) {
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
    source.onerror = (error) => {
      console.error('Audio playback error:', error);
      setAudioError('Ошибка воспроизведения аудио');
      setActiveWordId(null);
      setIsPlaying(false);
    };
    source.start();
  }, [audioContext, isAudioReady, audioBuffers]);

  // Play a sequence of words
  const playLine = useCallback((wordIds: string[]) => {
    if (!audioContext || !isAudioReady) {
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
        source.onerror = (error) => {
          console.error('Audio playback error:', error);
          currentIndex++;
          playNextWord();
        };
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
    if (!audioContext || !isAudioReady) {
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
        source.onerror = (error) => {
          console.error('Audio playback error:', error);
          currentWordIndex++;
          playNextWord();
        };
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
    setPlayMode
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};