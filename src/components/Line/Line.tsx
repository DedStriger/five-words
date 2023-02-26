import { FC, useContext } from 'react';
import cl from 'classnames';

import Cell from 'components/Cell';

import styles from './Line.module.scss';
import { BoardContext, BoardContextType } from 'context/boardContext';

type LineProps = {
  linePos: number;
};

const Line: FC<LineProps> = ({ linePos }) => {
  const { lineShouldToShake } = useContext(BoardContext) as BoardContextType;

  return (
    <div className={cl(styles.line, lineShouldToShake === linePos && styles.line_shaked)}>
      <Cell cellPos={0} linePos={linePos} />
      <Cell cellPos={1} linePos={linePos} />
      <Cell cellPos={2} linePos={linePos} />
      <Cell cellPos={3} linePos={linePos} />
      <Cell cellPos={4} linePos={linePos} />
    </div>
  );
};

export default Line;
