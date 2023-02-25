import { FC, useContext } from 'react';
import cl from 'classnames';

import styles from './Key.module.scss';
import { BoardContext, BoardContextType } from 'context/boardContext';

type KeyProps = {
  value: string;
  isLong?: boolean;
};

const Key: FC<KeyProps> = ({ value, isLong }) => {
  const { onAddChar, onDeleteChar, onEnter } = useContext(BoardContext) as BoardContextType;

  const handleClick = () => {
    if (value === 'Ввод') {
      onEnter();
    } else if (value === 'Удалить') {
      onDeleteChar();
    } else {
      onAddChar(value);
    }
  };

  return (
    <button className={cl(styles.key, isLong && styles.key_long)} onClick={handleClick}>
      {value}
    </button>
  );
};

export default Key;
