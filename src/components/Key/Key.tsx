import { FC, useContext } from 'react';
import cl from 'classnames';

import styles from './Key.module.scss';
import { BoardContext, BoardContextType } from 'context/boardContext';

type KeyProps = {
  value: string;
  isLong?: boolean;
  onClick: (value: string) => void;
};

const Key: FC<KeyProps> = ({ value, isLong, onClick }) => {
  const { setBoard } = useContext(BoardContext) as BoardContextType;
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
