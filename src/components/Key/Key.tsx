import { FC, useContext } from 'react';
import cl from 'classnames';

import { BoardContext, BoardContextType } from 'context/boardContext';

import styles from './Key.module.scss';

type KeyProps = {
  value: string;
  isLong?: boolean;
  onClick: (value: string) => void;
};

const Key: FC<KeyProps> = ({ value, isLong, onClick }) => {
  const { exactChars, emptyChars, existsChars } = useContext(BoardContext) as BoardContextType;
  const isEmpty = emptyChars.indexOf(value.toUpperCase()) !== -1;
  const isExact = exactChars.indexOf(value.toUpperCase()) !== -1;
  const isExists = existsChars.indexOf(value.toUpperCase()) !== -1;

  const handleClick = () => {
    onClick(value);
  };

  const computedClassNames = cl(
    styles.key,
    isLong && styles.key_long,
    isEmpty && styles.key_empty,
    isExists && styles.key_exists,
    isExact && styles.key_exact,
  );

  return (
    <button className={computedClassNames} onClick={handleClick}>
      {value}
    </button>
  );
};

export default Key;
