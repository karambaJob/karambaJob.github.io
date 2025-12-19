export interface Word {
  text: string;      // Отображаемый текст
  audio: string;     // Путь к аудиофайлу
  id: string;        // Уникальный идентификатор
  image?: string;     // Путь к изображению (опционально)
}

export interface SongConfig {
  id: string;
  title: string;
  lines: Word[][];   // lines[строка][слово_в_строке]
  bpm?: number;
  metadata?: {
    author?: string;
    difficulty: 'easy' | 'medium' | 'hard';
    duration: number;
    tags: string[];
  };
}

export interface AppConfig {
  songs: SongConfig[];
  defaultSongId?: string;
}

export interface SongSelectorProps {
  songs: SongConfig[];
  selectedSongId: string;
  onSelectSong: (songId: string) => void;
}

export interface SongPlayerProps {
  song: SongConfig;
  onBack: () => void;
}

export interface WordButtonProps {
  word: Word;
  isActive: boolean;
  onClick: () => void;
}

export interface LineProps {
  words: Word[];
  activeWordId?: string;
  onWordClick: (wordId: string) => void;
}

export interface PlayerControlsProps {
  isPlaying: boolean;
  playMode: 'word' | 'line' | 'song' | 'single';
  onPlay: () => void;
  onPause: () => void;
  onModeChange: (mode: 'word' | 'line' | 'song' | 'single') => void;
  onPrevious?: () => void;
  onNext?: () => void;
}

export interface AudioContextValue {
  isAudioReady: boolean;
  audioError: string | null;
  activeWordId: string | null;
  isPlaying: boolean;
  playMode: 'word' | 'line' | 'song' | 'single';
  audioBuffers: Map<string, AudioBuffer>;
  preloadSongAudio: (song: SongConfig) => Promise<void>;
  playWord: (wordId: string) => void;
  playLine: (wordIds: string[]) => void;
  playSong: (song: SongConfig) => void;
  stopPlayback: () => void;
  setPlayMode: (mode: 'word' | 'line' | 'song' | 'single') => void;
  resetSongLoading: (songId: string) => void;
  isLoading: boolean;
}