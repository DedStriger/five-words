import { FC, useContext, useEffect, useCallback } from 'react';

import { BoardContext, BoardContextType } from 'context/boardContext';
import { TOP_LINE, BOTTOM_LINE, MID_LINE } from 'utils/constants/keyBoardSettings';

import Key from 'components/Key';

import styles from './KeyBoard.module.scss';

const KeyBoard: FC = () => {
  const { onAddChar, onDeleteChar, onEnter, currentLine } = useContext(
    BoardContext,
  ) as BoardContextType;

  const onClick = useCallback(
    (value: string) => {
      if (value === 'Ввод') {
        onEnter();
      } else if (value === 'Удалить') {
        onDeleteChar();
      } else {
        onAddChar(value);
      }
    },
    [onAddChar, onDeleteChar, onEnter],
  );

  const onKeyBoard = useCallback(
    (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();

      if (key === 'ENTER') {
        onEnter();
      } else if (key === 'BACKSPACE') {
        onDeleteChar();
      } else {
        const availableKeys = [...TOP_LINE, ...BOTTOM_LINE, ...MID_LINE];
        const isKeyExists = availableKeys.indexOf(key.toUpperCase()) > 0;

        if (isKeyExists) {
          onAddChar(key);
        }
      }
    },
    [onAddChar, onDeleteChar, onEnter],
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyBoard);

    return () => document.removeEventListener('keydown', onKeyBoard);
  }, [onKeyBoard]);

  return (
    <div className={styles.keyboard}>
      <div className={styles.keyboard__line}>
        {TOP_LINE.map((item, i) => (
          <Key key={`${item}${i}`} value={item} onClick={onClick} />
        ))}
      </div>
      <div className={styles.keyboard__line}>
        {MID_LINE.map((item, i) => (
          <Key key={`${item}${i}`} value={item} onClick={onClick} />
        ))}
      </div>
      <div className={styles.keyboard__line}>
        <Key value='Ввод' isEnter onClick={onClick} isDisbaled={currentLine.cellpos !== 5} />
        {BOTTOM_LINE.map((item, i) => (
          <Key key={`${item}${i}`} value={item} onClick={onClick} />
        ))}
        <Key value='Удалить' isDelete onClick={onClick} isDisbaled={currentLine.cellpos === 0} />
      </div>
    </div>
  );
};

export default KeyBoard;
