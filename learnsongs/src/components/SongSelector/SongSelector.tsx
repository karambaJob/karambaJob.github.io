import React from 'react';
import { SongConfig, SongSelectorProps } from '../../types/song';
import styles from './SongSelector.module.css';

const SongSelector: React.FC<SongSelectorProps> = ({ 
  songs, 
  selectedSongId, 
  onSelectSong 
}) => {
  const handleSongSelect = (songId: string) => {
    onSelectSong(songId);
  };

  return (
    <div className={styles.songSelector} role="main" aria-label="Выбор песен">
      <h1 className={styles.title}>LearnSongs</h1>
      <div className={styles.songGrid} role="list">
        {songs.map((song) => (
          <div 
            key={song.id}
            className={`${styles.songCard} ${selectedSongId === song.id ? styles.selected : ''}`}
            onClick={() => handleSongSelect(song.id)}
            role="listitem"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleSongSelect(song.id);
              }
            }}
            aria-label={`Песня: ${song.title}`}
          >
            <div className={styles.songInfo}>
              <h2 className={styles.songTitle}>{song.title}</h2>
              {song.metadata && (
                <div className={styles.songMetadata}>
                  <span className={`${styles.difficulty} ${styles[song.metadata.difficulty]}`}>
                    {song.metadata.difficulty}
                  </span>
                  <span className={styles.duration}>
                    {song.metadata.duration} сек
                  </span>
                </div>
              )}
              {song.metadata?.tags && (
                <div className={styles.tags}>
                  {song.metadata.tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongSelector;