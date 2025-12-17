# LearnSongs Audio System Specification

## Audio Architecture

### Web Audio API Implementation
The application will use Web Audio API as the primary audio engine with HTML5 Audio as a fallback for better compatibility.

### Audio Context Management
- Single AudioContext instance managed by AudioProvider
- Proper context lifecycle management (suspend/resume)
- Automatic cleanup on component unmount

## Core Audio Functions

### Audio Preloading
```typescript
// Preload all audio files for a song
const preloadAudio = async (song: SongConfig): Promise<Map<string, AudioBuffer>> => {
  const audioContext = getAudioContext();
  const buffers = new Map<string, AudioBuffer>();
  
  // Load all word audio files in parallel
  const loadPromises = song.lines.flat().map(async (word) => {
    try {
      const response = await fetch(word.audio);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      buffers.set(word.id, audioBuffer);
    } catch (error) {
      console.error(`Failed to load audio for word ${word.id}:`, error);
    }
  });
  
  await Promise.all(loadPromises);
  return buffers;
};
```

### Audio Playback
```typescript
// Play a single word's audio
const playWordAudio = (wordId: string, buffers: Map<string, AudioBuffer>): void => {
  console.log(`Playing word ${wordId}`);
  const buffer = buffers.get(wordId);
  if (!buffer) return;
  
  const audioContext = getAudioContext();
  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(audioContext.destination);
  source.start();
};
```

### Sequential Playback
```typescript
// Play a sequence of words with delays
const playWordSequence = async (
  wordIds: string[], 
  buffers: Map<string, AudioBuffer>,
  onWordStart: (wordId: string) => void,
  delay: number = 0.5
): Promise<void> => {
  for (const wordId of wordIds) {
    onWordStart(wordId);
    playWordAudio(wordId, buffers);
    await new Promise(resolve => setTimeout(resolve, delay * 1000));
  }
};
```

## Audio System Components

### useAudioPreloader Hook
**Purpose**: Handle audio file preloading
**Features**:
- Parallel loading of all audio files
- Progress tracking
- Error handling with fallbacks
- Caching of loaded audio buffers

### useAudio Hook
**Purpose**: Manage audio playback
**Features**:
- Play individual words
- Play word sequences
- Play entire lines
- Play entire songs
- Playback state management

### AudioProvider Component
**Purpose**: Global audio state management
**Features**:
- AudioContext lifecycle management
- Audio buffer storage
- Playback state management
- Error handling and fallbacks

## Audio Performance Optimization

### Buffer Management
- Reuse AudioContext instance
- Cache decoded AudioBuffers
- Clean up unused buffers
- Memory usage monitoring

### Playback Optimization
- Immediate playback start
- Minimal latency between clicks and audio
- Efficient buffer source creation
- Proper resource cleanup

## Error Handling and Fallbacks

### Audio Loading Errors
```typescript
const handleAudioError = (word: Word, error: Error): void => {
  console.error(`Failed to load audio for ${word.text}:`, error);
  
  // Try SpeechSynthesis fallback
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(word.text);
    utterance.lang = 'ru-RU';
    speechSynthesis.speak(utterance);
  } else {
    // Show error message to user
    showError(`Не удалось воспроизвести "${word.text}"`);
  }
};
```

### Context Initialization Errors
```typescript
const initializeAudioContext = async (): Promise<AudioContext> => {
  try {
    const context = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (context.state === 'suspended') {
      await context.resume();
    }
    return context;
  } catch (error) {
    console.error('Failed to initialize AudioContext:', error);
    throw new Error('Audio initialization failed');
  }
};
```

## Audio System State Management

### Audio Context States
- `suspended`: Audio context is suspended (initial state)
- `running`: Audio context is active and processing
- `closed`: Audio context is closed and cannot be used

### Buffer States
- `loading`: Audio files are being fetched and decoded
- `loaded`: Audio buffers are ready for playback
- `error`: Audio loading failed

### Playback States
- `idle`: No audio is playing
- `playing`: Audio is currently playing
- `paused`: Audio playback is paused

## Mobile-Specific Considerations

### iOS Audio Restrictions
- Audio context must be resumed on user interaction
- Web Audio API requires user gesture to start
- Autoplay restrictions

### Memory Management
- Limit concurrent audio buffers
- Clean up unused resources
- Monitor memory usage on mobile devices

### Performance Optimization
- Reduce audio buffer sizes where possible
- Optimize decoding for mobile processors
- Minimize concurrent audio operations

## Audio System API

### AudioProvider Context
```typescript
interface AudioContextValue {
  // State
  isAudioReady: boolean;
  audioError: string | null;
  activeWordId: string | null;
  isPlaying: boolean;
  
  // Audio buffers
  audioBuffers: Map<string, AudioBuffer>;
  
  // Actions
  preloadSongAudio: (song: SongConfig) => Promise<void>;
  playWord: (wordId: string) => void;
  playLine: (wordIds: string[]) => void;
  playSong: (song: SongConfig) => void;
  stopPlayback: () => void;
}
```

### useAudio Hook
```typescript
interface UseAudioReturn {
  playWord: (wordId: string) => void;
  playLine: (wordIds: string[]) => void;
  playSong: (song: SongConfig) => void;
  stop: () => void;
  isActive: (wordId: string) => boolean;
}
```

### useAudioPreloader Hook
```typescript
interface UseAudioPreloaderReturn {
  preload: (song: SongConfig) => Promise<void>;
  loading: boolean;
  progress: number;
  error: string | null;
}
```

## Audio Testing Strategy

### Unit Tests
- Audio buffer loading
- Playback functions
- Error handling
- State transitions

### Integration Tests
- Complete song playback
- Mode switching
- Error recovery
- Memory management

### Performance Tests
- Loading times
- Memory usage
- Playback latency
- Mobile performance