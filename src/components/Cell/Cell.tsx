import { FC, useContext } from 'react';

import { BoardContext, BoardContextType } from 'context/boardContext';

import styles from './Cell.module.scss';

type CellProps = {
  cellPos: number;
  linePos: number;
};

const Cell: FC<CellProps> = ({ cellPos, linePos }) => {
  const { board } = useContext(BoardContext) as BoardContextType;
  const char = board[linePos][cellPos];

  return <div className={styles.cell}>{char}</div>;
};

export default Cell;
