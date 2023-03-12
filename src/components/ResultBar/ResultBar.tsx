import Timer from 'components/Timer';
import styles from './ResultBar.module.scss';

const ResultBar = () => {
  return (
    <div className={styles.bar}>
      <div className={styles.bar__title}>Вы отгадали слово!</div>
      <Timer />
    </div>
  );
};

export default ResultBar;
