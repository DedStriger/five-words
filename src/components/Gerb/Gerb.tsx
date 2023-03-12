import { ReactComponent as GerbIc } from 'assets/images/gerb.svg';

import styles from './Gerb.module.scss';

const Gerb = () => {
  return (
    <div className={styles.gerb}>
      <GerbIc className={styles.gerb__logo} />
    </div>
  );
};

export default Gerb;
