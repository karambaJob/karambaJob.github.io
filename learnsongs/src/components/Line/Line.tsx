import React from 'react';
import { LineProps } from '../../types/song';
import WordButton from '../WordButton/WordButton';
import styles from './Line.module.css';

const Line: React.FC<LineProps> = ({ words, activeWordId, onWordClick }) => {
  return (
    <div className={styles.line} role="row">
      {words.map((word) => (
        <WordButton
          key={word.id}
          word={word}
          isActive={word.id === activeWordId}
          onClick={() => onWordClick(word.id)}
        />
      ))}
    </div>
  );
};

export default Line;