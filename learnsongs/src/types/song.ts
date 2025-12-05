export interface Word {
  text: string;      // Отображаемый текст
  audio: string;     // Путь к аудиофайлу
  id: string;        // Уникальный идентификатор
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
  playMode: 'word' | 'line' | 'song';
  onPlay: () => void;
  onPause: () => void;
  onModeChange: (mode: 'word' | 'line' | 'song') => void;
  onPrevious: () => void;
  onNext: () => void;
}