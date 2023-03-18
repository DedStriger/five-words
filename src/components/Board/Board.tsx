import { FC } from 'react';

import { useBoardSize } from 'hooks/useLineSize';

import Line from 'components/Line';

import styles from './Board.module.scss';

const Board: FC = () => {
  const { containerRef, containerSize, fontSize } = useBoardSize();

  const badInnerHTML = containerSize.width > 0 && containerSize.height > 0;

  return (
    <div className={styles.board}>
      <div id='board' ref={containerRef} className={styles.board__wrapper}>
        {badInnerHTML && (
          <div
            className={styles.board__lines}
            style={{ fontSize: fontSize, width: containerSize.width, height: containerSize.height }}>
            <Line linePos={0} />
            <Line linePos={1} />
            <Line linePos={2} />
            <Line linePos={3} />
            <Line linePos={4} />
            <Line linePos={5} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Board;
