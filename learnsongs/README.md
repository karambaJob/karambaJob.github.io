# LearnSongs

An interactive web application for children to learn songs through visual and audio cues.

## Features

- Interactive song lyrics with audio playback
- Multiple playback modes (word, line, song)
- Tablet-optimized responsive design
- Accessibility compliant (WCAG 2.1 AA)
- Web Audio API with HTML5 Audio fallback
- SpeechSynthesis fallback for missing audio files

## Development

This project is built with:
- React 18+ with TypeScript
- Vite for fast development
- CSS Modules for styling
- Web Audio API for audio playback

### Project Structure

```
learnsongs/
├── public/
│   └── audio/              # Audio files for songs
├── src/
│   ├── components/         # React components
│   ├── providers/          # React context providers
│   ├── types/             # TypeScript type definitions
│   ├── data/              # Sample data and configuration
│   └── App.tsx            # Main application component
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

### Components

1. **AudioProvider** - Manages audio context and playback state
2. **SongSelector** - Displays available songs for selection
3. **SongPlayer** - Main playback interface for selected song
4. **Line** - Displays a line of words
5. **WordButton** - Interactive button for each word
6. **PlayerControls** - Controls for playback and mode selection

### Audio System

The application uses the Web Audio API for high-quality audio playback with HTML5 Audio as a fallback. All audio files for a song are preloaded when the song is selected to ensure minimal playback delay.

### Playback Modes

1. **Word Mode** - Click individual words to play them
2. **Line Mode** - Click any word in a line to play the entire line
3. **Song Mode** - Play the entire song sequentially

### Accessibility Features

- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- High contrast color scheme
- Focus indicators for interactive elements

## Setup

### Prerequisites

- Node.js (version 16 or higher)
- npm (version 8 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd learnsongs
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

### Previewing Production Build

To preview the production build locally:

```bash
npm run preview
```

## Adding New Songs

To add new songs to the application:

1. Add audio files to the `public/audio/` directory
2. Update the song configuration in `src/data/config.ts`
3. Ensure each word has a corresponding audio file

### Song Configuration Format

```typescript
const appConfig: AppConfig = {
  songs: [
    {
      id: "unique-identifier",
      title: "Song Title",
      lines: [
        [
          { text: "Word", audio: "/audio/path/to/audio.mp3", id: "unique-word-id" },
          // ... more words
        ],
        // ... more lines
      ],
      metadata: {
        difficulty: "easy" | "medium" | "hard",
        duration: 30, // in seconds
        tags: ["tag1", "tag2"]
      }
    }
  ],
  defaultSongId: "identifier"
};
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

The application is optimized for tablet use with touch-friendly interface elements.

## Error Handling

The application includes comprehensive error handling:
- Audio loading errors with fallbacks
- SpeechSynthesis fallback for missing audio files
- Graceful degradation for unsupported features

## Performance

- Audio preloading for minimal playback delay
- Efficient React component rendering
- Memory management for audio resources
- Responsive design for all device sizes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.