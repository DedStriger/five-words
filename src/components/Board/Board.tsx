import { FC } from 'react';

import Line from 'components/Line';

import styles from './Board.module.scss';

const Board: FC = () => {
  return (
    <div className={styles.board}>
      <Line linePos={0} />
      <Line linePos={1} />
      <Line linePos={2} />
      <Line linePos={3} />
      <Line linePos={4} />
      <Line linePos={5} />
    </div>
  );
};

export default Board;
