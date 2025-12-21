import React from 'react';
import { WordButtonProps } from '../../types/song';
import styles from './WordButton.module.css';

const WordButton: React.FC<WordButtonProps> = ({ word, isActive, onClick }) => {
  const hasImage = !!word.image;
  
  const baseUrl = import.meta.env.BASE_URL;
  const imageUrl = baseUrl === '/' ? word.image : `${baseUrl}${word.audio}`;
  
  return (
    <button
      className={`${styles.wordButton} ${isActive ? styles.active : ''} ${hasImage ? styles.withImage : ''}`}
      onClick={onClick}
      aria-pressed={isActive}
      aria-label={`Слово: ${word.text}`}
      role="button"
      tabIndex={0}
    >
      {hasImage ? (
        <>
          <img
            src={`${imageUrl}`}
            alt={word.text}
            className={styles.wordImage}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <span className={styles.wordText}>{word.text}</span>
        </>
      ) : (
        word.text
      )}
    </button>
  );
};

export default WordButton;