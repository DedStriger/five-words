import { FC } from 'react';

import Cell from 'components/Cell';

import styles from './Line.module.scss';

type LineProps = {
  linePos: number;
};

const Line: FC<LineProps> = ({ linePos }) => {
  return (
    <div className={styles.line}>
      <Cell cellPos={0} linePos={linePos} />
      <Cell cellPos={1} linePos={linePos} />
      <Cell cellPos={2} linePos={linePos} />
      <Cell cellPos={3} linePos={linePos} />
      <Cell cellPos={4} linePos={linePos} />
    </div>
  );
};

export default Line;
