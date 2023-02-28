import { FC, useContext } from 'react';
import cl from 'classnames';

import { ReactComponent as EnterIc } from 'assets/images/mark.svg';
import { ReactComponent as DeleteIc } from 'assets/images/delete.svg';

import { BoardContext, BoardContextType } from 'context/boardContext';

import styles from './Key.module.scss';

type KeyProps = {
  value: string;
  isEnter?: boolean;
  isDelete?: boolean;
  isDisbaled?: boolean;
  onClick: (value: string) => void;
};

const Key: FC<KeyProps> = ({ value, isEnter, isDelete, isDisbaled, onClick }) => {
  const { exactChars, emptyChars, existsChars } = useContext(BoardContext) as BoardContextType;
  const isEmpty = emptyChars.indexOf(value.toUpperCase()) !== -1;
  const isExact = exactChars.indexOf(value.toUpperCase()) !== -1;
  const isExists = existsChars.indexOf(value.toUpperCase()) !== -1;

  const handleClick = () => {
    onClick(value);
  };

  const computedClassNames = cl(
    styles.key,
    isDelete && styles.key_delete,
    isEnter && styles.key_enter,
    isEmpty && styles.key_empty,
    isExists && styles.key_exists,
    isExact && styles.key_exact,
  );

  const renderContent = () => {
    if (isEnter) {
      return <EnterIc />;
    }
    if (isDelete) {
      return <DeleteIc />;
    }
    return value;
  };

  return (
    <button className={computedClassNames} onClick={handleClick} disabled={isDisbaled}>
      {renderContent()}
    </button>
  );
};

export default Key;
