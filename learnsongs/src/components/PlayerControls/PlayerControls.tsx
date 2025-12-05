import React from 'react';
import { PlayerControlsProps } from '../../types/song';
import styles from './PlayerControls.module.css';

const PlayerControls: React.FC<PlayerControlsProps> = ({
  isPlaying,
  playMode,
  onPlay,
  onPause,
  onModeChange,
  onPrevious,
  onNext
}) => {
  return (
    <div className={styles.playerControls} role="region" aria-label="Управление воспроизведением">
      <div className={styles.modeSelector}>
        <button
          className={`${styles.modeButton} ${playMode === 'word' ? styles.active : ''}`}
          onClick={() => onModeChange('word')}
          aria-pressed={playMode === 'word'}
          aria-label="Режим воспроизведения по словам"
        >
          Слово
        </button>
        <button
          className={`${styles.modeButton} ${playMode === 'line' ? styles.active : ''}`}
          onClick={() => onModeChange('line')}
          aria-pressed={playMode === 'line'}
          aria-label="Режим воспроизведения по строкам"
        >
          Строка
        </button>
        <button
          className={`${styles.modeButton} ${playMode === 'song' ? styles.active : ''}`}
          onClick={() => onModeChange('song')}
          aria-pressed={playMode === 'song'}
          aria-label="Режим воспроизведения всей песни"
        >
          Песня
        </button>
      </div>

      <div className={styles.playbackControls}>
        <button 
          className={styles.controlButton} 
          onClick={onPrevious}
          aria-label="Предыдущее"
        >
          ←
        </button>
        <button
          className={`${styles.playButton} ${isPlaying ? styles.playing : ''}`}
          onClick={isPlaying ? onPause : onPlay}
          aria-label={isPlaying ? "Пауза" : "Воспроизвести"}
        >
          {isPlaying ? '❚❚' : '▶'}
        </button>
        <button 
          className={styles.controlButton} 
          onClick={onNext}
          aria-label="Следующее"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default PlayerControls;