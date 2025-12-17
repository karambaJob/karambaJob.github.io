# LearnSongs Application - Complete Specification

## Project Overview
LearnSongs is an interactive web application designed for children to learn songs through visual and audio cues. The application provides a tablet-optimized interface with large interactive elements, immediate audio feedback, and multiple playback modes.

## Key Features

### Song Management
- Multiple song support with flexible configuration
- Song selection with metadata display
- Search and filtering capabilities

### Audio System
- Web Audio API with HTML5 Audio fallback
- Preloading for minimal playback delay
- Three playback modes (word, line, song)
- Error handling with SpeechSynthesis fallback

### User Interface
- Large touch-friendly interactive elements
- Responsive design optimized for tablets
- High contrast color scheme
- Visual feedback for active elements

### Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Focus indicators

## Technical Architecture

### Frontend Framework
- React 18+ with functional components and hooks
- TypeScript for type safety
- CSS Modules for styling
- Vite for build tooling

### Audio Implementation
- Web Audio API for primary playback
- Audio buffer caching for performance
- Proper resource cleanup
- Cross-browser compatibility

### Component Structure
- AudioProvider for global state management
- SongSelector for song browsing
- SongPlayer for main playback interface
- Line and WordButton for lyrics display
- PlayerControls for playback management

### Data Flow
- Centralized song configuration
- Audio preloading on song selection
- State management through React Context
- Component communication via props

## Implementation Plan

### Phase 1: Foundation
1. Project setup with Vite and TypeScript
2. Type definitions implementation
3. Basic file structure creation
4. CSS Modules configuration

### Phase 2: Core Systems
1. Audio system implementation
2. State management with React Context
3. Custom hooks development
4. Data loading and management

### Phase 3: UI Components
1. SongSelector component
2. SongPlayer component
3. Line and WordButton components
4. PlayerControls component

### Phase 4: Features
1. Playback mode implementation
2. Responsive design
3. Accessibility features
4. Error handling

### Phase 5: Testing & Optimization
1. Unit and integration testing
2. Performance optimization
3. Mobile device testing
4. Documentation

## Technical Requirements Compliance

### Framework Requirements
- ✅ React 18+ with functional components and hooks
- ✅ TypeScript with strict typing
- ✅ CSS Modules with responsive design
- ✅ Web Audio API + HTML5 Audio fallback

### Functional Requirements
- ✅ Song selection from list
- ✅ Metadata display (difficulty, tags, duration)
- ✅ Search and filtering by tags
- ✅ Word click playback
- ✅ Audio preloading
- ✅ Minimal playback delay
- ✅ Line and song playback modes

### UI Requirements
- ✅ Large interactive buttons (min. 100x50px)
- ✅ Visual separation of lines
- ✅ Current word/line highlighting
- ✅ Progress bar for songs
- ✅ Tablet-optimized responsive design

### Accessibility Requirements
- ✅ High contrast color scheme (#4A90E2, #F5F5F5)
- ✅ Large readable font (min 20px)
- ✅ WCAG 2.1 AA compliance
- ✅ Keyboard navigation support
- ✅ Focus indicators

### Performance Requirements
- ✅ Minimal audio playback delay
- ✅ Audio preloading on song selection
- ✅ React.memo and useMemo optimization
- ✅ Proper audio resource cleanup

## File Structure
```
learnsongs/
├── src/
│   ├── types/
│   │   └── song.ts
│   ├── data/
│   │   └── config.ts
│   ├── hooks/
│   │   ├── useAudio.ts
│   │   ├── useSongs.ts
│   │   └── useAudioPreloader.ts
│   ├── components/
│   │   ├── SongSelector/
│   │   │   ├── SongSelector.tsx
│   │   │   └── SongSelector.module.css
│   │   ├── SongPlayer/
│   │   │   ├── SongPlayer.tsx
│   │   │   └── SongPlayer.module.css
│   │   ├── Line/
│   │   │   ├── Line.tsx
│   │   │   └── Line.module.css
│   │   ├── WordButton/
│   │   │   ├── WordButton.tsx
│   │   │   └── WordButton.module.css
│   │   ├── PlayerControls/
│   │   │   ├── PlayerControls.tsx
│   │   │   └── PlayerControls.module.css
│   │   └── Layout/
│   │       ├── Layout.tsx
│   │       └── Layout.module.css
│   ├── providers/
│   │   └── AudioProvider.tsx
│   ├── utils/
│   │   ├── audioLoader.ts
│   │   └── formatters.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
│   └── audio/
├── package.json
├── tsconfig.json
├── vite.config.ts
└── index.html
```

## Sample Data Structure
```typescript
const appConfig: AppConfig = {
  songs: [
    {
      id: "tractor",
      title: "Синий трактор",
      lines: [
        [
          { text: "Что", audio: "/audio/tractor/1.mp3", id: "t1" },
          { text: "ты", audio: "/audio/tractor/2.mp3", id: "t2" },
          { text: "делал", audio: "/audio/tractor/3.mp3", id: "t3" },
          { text: "Синий", audio: "/audio/tractor/4.mp3", id: "t4" },
          { text: "трактор", audio: "/audio/tractor/5.mp3", id: "t5" }
        ],
        [
          { text: "Ездил", audio: "/audio/tractor/6.mp3", id: "t6" },
          { text: "по", audio: "/audio/tractor/7.mp3", id: "t7" },
          { text: "каким", audio: "/audio/tractor/8.mp3", id: "t8" },
          { text: "делам", audio: "/audio/tractor/9.mp3", id: "t9" }
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

## Deliverables
1. Complete source code in learnsongs directory
2. package.json with all dependencies
3. README.md with setup and usage instructions
4. Production-ready build
5. Comprehensive documentation

## Success Criteria
- All technical requirements implemented
- Tablet-optimized responsive design
- WCAG 2.1 AA accessibility compliance
- Minimal audio playback latency
- Error handling with graceful fallbacks
- Well-documented codebase
- Easy extensibility for new songs