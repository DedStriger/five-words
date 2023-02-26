import { FC, useContext } from 'react';
import cl from 'classnames';

import { BoardContext, BoardContextType } from 'context/boardContext';

import styles from './Cell.module.scss';

type CellProps = {
  cellPos: number;
  linePos: number;
};

const Cell: FC<CellProps> = ({ cellPos, linePos }) => {
  const { board, winningWord, currentLine } = useContext(BoardContext) as BoardContextType;

  const char = board[linePos][cellPos];
  const isPassedLine = currentLine.linepos > linePos;
  const isActive = !isPassedLine && !!char;
  const isExact = isPassedLine && winningWord[cellPos].toUpperCase() === char.toUpperCase();
  const isExists =
    isPassedLine && winningWord.toUpperCase().indexOf(char.toUpperCase()) !== -1 && char !== '';
  const isEmpty = isPassedLine && !isExact && !isExists;

  const computedClassNames = cl(
    styles.cell,
    isEmpty && styles.cell_empty,
    isActive && styles.cell_active,
    isExists && styles.cell_exists,
    isExact && styles.cell_exact,
  );

  return <div className={computedClassNames}>{char}</div>;
};

export default Cell;
