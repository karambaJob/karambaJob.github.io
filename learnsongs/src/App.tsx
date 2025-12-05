import React from 'react';
import { appConfig } from './data/config';
import SongSelector from './components/SongSelector/SongSelector';
import SongPlayer from './components/SongPlayer/SongPlayer';
import { AudioProvider } from './providers/AudioProvider';
import { SongConfig } from './types/song';
import './App.css';

const App: React.FC = () => {
  const [selectedSong, setSelectedSong] = React.useState<SongConfig | null>(null);

  const handleSelectSong = (songId: string) => {
    const song = appConfig.songs.find(s => s.id === songId);
    if (song) {
      setSelectedSong(song);
    }
  };

  const handleBack = () => {
    setSelectedSong(null);
  };

  return (
    <AudioProvider>
      <div className="app">
        {!selectedSong ? (
          <SongSelector 
            songs={appConfig.songs}
            selectedSongId={appConfig.defaultSongId || ''}
            onSelectSong={handleSelectSong}
          />
        ) : (
          <SongPlayer 
            song={selectedSong}
            onBack={handleBack}
          />
        )}
      </div>
    </AudioProvider>
  );
};

export default App;