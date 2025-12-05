import React from 'react';
import { useNavigate } from 'react-router-dom';
import { appConfig } from '../../data/config';
import SongSelector from '../SongSelector/SongSelector';
import styles from './SongList.module.css';

const SongList: React.FC = () => {
  const navigate = useNavigate();

  const handleSelectSong = (songId: string) => {
    navigate(`/song/${songId}`);
  };

  return (
    <div className={styles.songList}>
      <SongSelector
        songs={appConfig.songs}
        selectedSongId={appConfig.defaultSongId || ''}
        onSelectSong={handleSelectSong}
      />
    </div>
  );
};

export default SongList;