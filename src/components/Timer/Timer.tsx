import { useTimer } from 'hooks/useTimer';

import styles from './Timer.module.scss';

const Timer = () => {
  const { hours, minutes, seconds } = useTimer();

  return (
    <div className={styles.timer}>
      <div className={styles.timer__title}>Новое слово появится через:</div>
      <div className={styles.timer__clock}>
        <div className={styles.timer__digit}>{hours}</div>:<div className={styles.timer__digit}>{minutes}</div>:
        <div className={styles.timer__digit}>{seconds}</div>
      </div>
    </div>
  );
};

export default Timer;
