import React from 'react';
import { AudioProvider } from './providers/AudioProvider';
import { Routes, Route } from 'react-router-dom';
import SongList from './components/SongList/SongList';
import SongPlayerRoute from './components/SongPlayerRoute/SongPlayerRoute';
import './App.css';

const App: React.FC = () => {
  return (
    <AudioProvider>
      <div className="app">
        <Routes>
          <Route path="/" element={<SongList />} />
          <Route path="/song/:songId" element={<SongPlayerRoute />} />
        </Routes>
      </div>
    </AudioProvider>
  );
};

export default App;