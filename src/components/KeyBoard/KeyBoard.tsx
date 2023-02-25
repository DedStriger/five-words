import { FC, useState } from 'react';

import Key from 'components/Key';

import styles from './KeyBoard.module.scss';

type KeyBoardProps = {
  onAddValue: (value: string) => void;
  onDeleteValue: () => void;
};

const topValues = ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ'];
const middleValues = ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'];
const bottomValues = ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю'];

const KeyBoard: FC<KeyBoardProps> = ({ onAddValue, onDeleteValue }) => {
  const onClick = (value: string) => {
    if (value === 'Удалить') {
      onDeleteValue();
    } else {
      onAddValue(value);
    }
  };

  return (
    <div>
      <div className={styles.keyboard__line}>
        {topValues.map((item, i) => (
          <Key key={`${item}${i}`} value={item} onClick={onClick} />
        ))}
      </div>
      <div className={styles.keyboard__line}>
        {middleValues.map((item, i) => (
          <Key key={`${item}${i}`} value={item} onClick={onClick} />
        ))}
      </div>
      <div className={styles.keyboard__line}>
        <Key value='Удалить' isLong onClick={onClick} />
        {bottomValues.map((item, i) => (
          <Key key={`${item}${i}`} value={item} onClick={onClick} />
        ))}
        <Key value='Ввод' isLong onClick={onClick} />
      </div>
    </div>
  );
};

export default KeyBoard;
