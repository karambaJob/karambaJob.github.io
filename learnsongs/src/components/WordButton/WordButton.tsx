import React from 'react';
import { WordButtonProps } from '../../types/song';
import styles from './WordButton.module.css';

const WordButton: React.FC<WordButtonProps> = ({ word, isActive, onClick }) => {
  return (
    <button
      className={`${styles.wordButton} ${isActive ? styles.active : ''}`}
      onClick={onClick}
      aria-pressed={isActive}
      aria-label={`Слово: ${word.text}`}
      role="button"
      tabIndex={0}
    >
      {word.text}
    </button>
  );
};

export default WordButton;