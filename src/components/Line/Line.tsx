import { FC, useContext } from 'react';
import cl from 'classnames';

import { BoardContext, BoardContextType } from 'context/boardContext';

import Cell from 'components/Cell';

import styles from './Line.module.scss';

type LineProps = {
  linePos: number;
};

const Line: FC<LineProps> = ({ linePos }) => {
  const { lineShouldToShake, winningLine } = useContext(BoardContext) as BoardContextType;

  const isNotFoundLine = lineShouldToShake === linePos;
  const isWinningLine = winningLine === linePos;

  return (
    <div className={cl(styles.line, isNotFoundLine && styles.line_shaked)}>
      <Cell cellPos={0} linePos={linePos} isNotFoundLine={isNotFoundLine} isWinningLine={isWinningLine} />
      <Cell cellPos={1} linePos={linePos} isWinningLine={isWinningLine} />
      <Cell cellPos={2} linePos={linePos} isWinningLine={isWinningLine} />
      <Cell cellPos={3} linePos={linePos} isWinningLine={isWinningLine} />
      <Cell cellPos={4} linePos={linePos} isWinningLine={isWinningLine} />
    </div>
  );
};

export default Line;
