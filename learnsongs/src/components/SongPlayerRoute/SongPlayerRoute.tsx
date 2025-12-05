import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { appConfig } from '../../data/config';
import SongPlayer from '../SongPlayer/SongPlayer';
import styles from './SongPlayerRoute.module.css';

const SongPlayerRoute: React.FC = () => {
  const { songId } = useParams<{ songId: string }>();
  const navigate = useNavigate();

  const song = appConfig.songs.find(s => s.id === songId) || null;

  const handleBack = () => {
    navigate('/');
  };

  if (!song) {
    return (
      <div className={styles.notFound}>
        <h2>Песня не найдена</h2>
        <button onClick={handleBack} className={styles.backButton}>
          Вернуться к списку песен
        </button>
      </div>
    );
  }

  return (
    <div className={styles.songPlayerRoute}>
      <SongPlayer
        song={song}
        onBack={handleBack}
      />
    </div>
  );
};

export default SongPlayerRoute;