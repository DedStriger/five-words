import { FC } from 'react';

import Timer from 'components/Timer';

import styles from './ResultBar.module.scss';

type ResultBarProps = {
  isWinning: boolean;
};

const ResultBar: FC<ResultBarProps> = ({ isWinning }) => {
  return (
    <div className={styles.bar}>
      <div className={styles.bar__title}>{isWinning ? 'Вы отгадали слово!' : 'Вы не отгадали слово'}</div>
      <Timer />
    </div>
  );
};

export default ResultBar;
