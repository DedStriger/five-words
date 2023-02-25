import { FC } from 'react';
import cl from 'classnames';

import styles from './Key.module.scss';

type KeyProps = {
  value: string;
  isLong?: boolean;
  onClick: (value: string) => void;
};

const Key: FC<KeyProps> = ({ value, isLong, onClick }) => {
  const handleClick = () => {
    onClick(value);
  };

  return (
    <button className={cl(styles.key, isLong && styles.key_long)} onClick={handleClick}>
      {value}
    </button>
  );
};

export default Key;
