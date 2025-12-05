import React, { useEffect } from 'react';
import { SongPlayerProps } from '../../types/song';
import { useAudio } from '../../providers/AudioProvider';
import Line from '../Line/Line';
import PlayerControls from '../PlayerControls/PlayerControls';
import styles from './SongPlayer.module.css';

const SongPlayer: React.FC<SongPlayerProps> = ({ song, onBack }) => {
  const { 
    isAudioReady, 
    audioError, 
    activeWordId, 
    isPlaying, 
    playMode, 
    preloadSongAudio,
    playWord,
    playLine,
    playSong,
    stopPlayback,
    setPlayMode
  } = useAudio();

  // Preload audio when song changes
  useEffect(() => {
    preloadSongAudio(song);
  }, [song, preloadSongAudio]);

  const handleWordClick = (wordId: string) => {
    if (playMode === 'word') {
      playWord(wordId);
    } else if (playMode === 'line') {
      // Find the line containing this word
      const line = song.lines.find(l => l.some(w => w.id === wordId));
      if (line) {
        const wordIds = line.map(w => w.id);
        playLine(wordIds);
      }
    }
  };

  const handlePlay = () => {
    if (playMode === 'song') {
      playSong(song);
    } else {
      // For word/line mode, we play when user clicks a word
      // This button could trigger the first word/line
      if (song.lines.length > 0 && song.lines[0].length > 0) {
        const firstWordId = song.lines[0][0].id;
        handleWordClick(firstWordId);
      }
    }
  };

  const handleModeChange = (mode: 'word' | 'line' | 'song') => {
    setPlayMode(mode);
  };

  return (
    <div className={styles.songPlayer} role="main" aria-label={`Воспроизведение песни: ${song.title}`}>
      <div className={styles.header}>
        <button 
          className={styles.backButton} 
          onClick={onBack}
          aria-label="Вернуться к выбору песен"
        >
          ← Назад
        </button>
        <h1 className={styles.title}>{song.title}</h1>
        {song.metadata && (
          <div className={styles.metadata}>
            <span className={`${styles.difficulty} ${styles[song.metadata.difficulty]}`}>
              {song.metadata.difficulty}
            </span>
            <span className={styles.duration}>
              {song.metadata.duration} сек
            </span>
          </div>
        )}
      </div>

      {audioError && (
        <div className={styles.error} role="alert" aria-live="assertive">
          Ошибка загрузки аудио: {audioError}
        </div>
      )}

      <div className={styles.content}>
        <div className={styles.lyrics} role="region" aria-label="Текст песни">
          {song.lines.map((line, lineIndex) => (
            <Line
              key={lineIndex}
              words={line}
              activeWordId={activeWordId}
              onWordClick={handleWordClick}
            />
          ))}
        </div>

        <PlayerControls
          isPlaying={isPlaying}
          playMode={playMode}
          onPlay={handlePlay}
          onPause={stopPlayback}
          onModeChange={handleModeChange}
          onPrevious={() => {}}
          onNext={() => {}}
        />
      </div>
    </div>
  );
};

export default SongPlayer;