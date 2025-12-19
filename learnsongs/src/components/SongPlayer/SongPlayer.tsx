import React, { useEffect, useState } from 'react';
import { SongPlayerProps } from '../../types/song';
import { useAudio } from '../../providers/AudioProvider';
import Line from '../Line/Line';
import PlayerControls from '../PlayerControls/PlayerControls';
import styles from './SongPlayer.module.css';

const SongPlayer: React.FC<SongPlayerProps> = ({ song, onBack }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isErrorHidden, setIsErrorHidden] = useState(false);
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
    setPlayMode,
    resetSongLoading,
    isLoading
  } = useAudio();

  // Preload audio when song changes
  useEffect(() => {
    if (song && isAudioReady && !isLoading) {
      preloadSongAudio(song);
    }
  }, [song, preloadSongAudio, isAudioReady, isLoading]);

  // Find which line contains the active word
  const activeLineIndex = activeWordId
    ? song.lines.findIndex(line => line.some(word => word.id === activeWordId))
    : -1;

  const handleWordClick = (wordId: string) => {
    console.log(`Word clicked: ${wordId}`);
    if (playMode === 'word') {
      playWord(wordId);
    } else if (playMode === 'line') {
      // Find the line containing this word
      const line = song.lines.find(l => l.some(w => w.id === wordId));
      if (line) {
        const wordIds = line.map(w => w.id);
        playLine(wordIds);
      }
    } else if (playMode === 'single') {
      playWord(wordId);
    }
  };

  const handlePlay = () => {
    if (playMode === 'song') {
      playSong(song);
    } else if (playMode === 'single') {
      // For single mode, play the current line
      if (song.lines.length > 0 && currentLineIndex < song.lines.length) {
        const wordIds = song.lines[currentLineIndex].map(w => w.id);
        playLine(wordIds);
      }
    } else {
      // For word/line mode, we play when user clicks a word
      // This button could trigger the first word/line
      if (song.lines.length > 0 && song.lines[0].length > 0) {
        const firstWordId = song.lines[0][0].id;
        handleWordClick(firstWordId);
      }
    }
  };

  const handlePreviousLine = () => {
    if (currentLineIndex > 0) {
      setCurrentLineIndex(currentLineIndex - 1);
    }
  };

  const handleNextLine = () => {
    if (currentLineIndex < song.lines.length - 1) {
      setCurrentLineIndex(currentLineIndex + 1);
    }
  };

  const handleModeChange = (mode: 'word' | 'line' | 'song' | 'single') => {
    setPlayMode(mode);
  };

  const handleRetry = () => {
    resetSongLoading(song.id);
    // Small delay to ensure state is reset before retrying
    setTimeout(() => {
      preloadSongAudio(song);
    }, 100);
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

      {audioError && !isErrorHidden && (
        <div className={styles.errorContainer}>
          <button
            className={styles.closeButton}
            onClick={() => setIsErrorHidden(true)}
            aria-label="Закрыть"
          >
            ×
          </button>
          <div className={styles.error} role="alert" aria-live="assertive">
            Ошибка загрузки аудио: {audioError}
            <button onClick={handleRetry} className={styles.retryButton}>
              Повторить попытку
            </button>
          </div>
        </div>
      )}

      {!isAudioReady && (
        <div className={styles.loading} role="status">
          Нажмите anywhere на странице, чтобы включить аудио
        </div>
      )}

      {isLoading && (
        <div className={styles.loading} role="status">
          Загрузка аудио...
        </div>
      )}

      <div className={styles.content}>
        <div className={styles.lyrics} role="region" aria-label="Текст песни">
          {playMode === 'single' ? (
            <div className={styles.singleLineContainer}>
              <Line
                words={song.lines[currentLineIndex]}
                activeWordId={activeWordId || undefined}
                onWordClick={handleWordClick}
                isActive={currentLineIndex === activeLineIndex}
              />
              <div className={styles.navigation}>
                <button
                  onClick={handlePreviousLine}
                  disabled={currentLineIndex === 0}
                  className={styles.navButton}
                  aria-label="Предыдущая строка"
                >
                  ←
                </button>
                <span className={styles.lineCounter}>
                  {currentLineIndex + 1} / {song.lines.length}
                </span>
                <button
                  onClick={handleNextLine}
                  disabled={currentLineIndex === song.lines.length - 1}
                  className={styles.navButton}
                  aria-label="Следующая строка"
                >
                  →
                </button>
              </div>
            </div>
          ) : (
            song.lines.map((line, lineIndex) => (
              <Line
                key={lineIndex}
                words={line}
                activeWordId={activeWordId || undefined}
                onWordClick={handleWordClick}
                isActive={lineIndex === activeLineIndex}
              />
            ))
          )}
        </div>

        <PlayerControls
          isPlaying={isPlaying}
          playMode={playMode}
          onPlay={handlePlay}
          onPause={stopPlayback}
          onModeChange={handleModeChange}
          onPrevious={playMode === 'single' ? handlePreviousLine : undefined}
          onNext={playMode === 'single' ? handleNextLine : undefined}
        />
      </div>
    </div>
  );
};

export default SongPlayer;