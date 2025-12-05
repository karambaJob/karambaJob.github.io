import React from 'react';
import { LineProps } from '../../types/song';
import WordButton from '../WordButton/WordButton';
import styles from './Line.module.css';

interface LineComponentProps extends LineProps {
  isActive: boolean;
}

const Line: React.FC<LineComponentProps> = ({ words, activeWordId, onWordClick, isActive }) => {
  return (
    <div className={`${styles.line} ${isActive ? styles.activeLine : styles.inactiveLine}`} role="row">
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