# LearnSongs Type Definitions

## Core Types

### Word Interface
```typescript
interface Word {
  text: string;      // Отображаемый текст
  audio: string;     // Путь к аудиофайлу
  id: string;        // Уникальный идентификатор
}
```

### SongConfig Interface
```typescript
interface SongConfig {
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
```

### AppConfig Interface
```typescript
interface AppConfig {
  songs: SongConfig[];
  defaultSongId?: string;
}
```

## Example Implementation

### Sample Song Data
```typescript
const appConfig: AppConfig = {
  songs: [
    {
      id: "tractor",
      title: "Синий трактор",
      lines: [
        [
          { text: "Что", audio: "/audio/tractor/chto.mp3", id: "t1" },
          { text: "ты", audio: "/audio/tractor/ty.mp3", id: "t2" },
          { text: "делал", audio: "/audio/tractor/delal.mp3", id: "t3" },
          { text: "Синий", audio: "/audio/tractor/sinii.mp3", id: "t4" },
          { text: "трактор", audio: "/audio/tractor/traktor.mp3", id: "t5" }
        ],
        [
          { text: "Ездил", audio: "/audio/tractor/ezdil.mp3", id: "t6" },
          { text: "по", audio: "/audio/tractor/po.mp3", id: "t7" },
          { text: "каким", audio: "/audio/tractor/kakim.mp3", id: "t8" },
          { text: "делам", audio: "/audio/tractor/delam.mp3", id: "t9" }
        ]
      ],
      metadata: {
        difficulty: "easy",
        duration: 30,
        tags: ["транспорт", "животные"]
      }
    }
  ],
  defaultSongId: "tractor"
};
```

## Component Props Types

### SongSelector Props
```typescript
interface SongSelectorProps {
  songs: SongConfig[];
  selectedSongId: string;
  onSelectSong: (songId: string) => void;
}
```

### SongPlayer Props
```typescript
interface SongPlayerProps {
  song: SongConfig;
  onBack: () => void;
}
```

### WordButton Props
```typescript
interface WordButtonProps {
  word: Word;
  isActive: boolean;
  onClick: () => void;
}
```

### Line Props
```typescript
interface LineProps {
  words: Word[];
  activeWordId?: string;
  onWordClick: (wordId: string) => void;
}
```

### PlayerControls Props
```typescript
interface PlayerControlsProps {
  isPlaying: boolean;
  playMode: 'word' | 'line' | 'song';
  onPlay: () => void;
  onPause: () => void;
  onModeChange: (mode: 'word' | 'line' | 'song') => void;
  onPrevious: () => void;
  onNext: () => void;
}