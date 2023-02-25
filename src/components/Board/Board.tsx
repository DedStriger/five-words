import { FC } from 'react';

import Line from 'components/Line';

import styles from './Board.module.scss';

type BoardProps = {
  values: string[];
};

const Board: FC<BoardProps> = ({ values }) => {
  return (
    <div className={styles.board}>
      <Line linePos={0} />
      <Line linePos={1} />
      <Line linePos={2} />
      <Line linePos={3} />
      <Line linePos={4} />
    </div>
  );
};

export default Board;
