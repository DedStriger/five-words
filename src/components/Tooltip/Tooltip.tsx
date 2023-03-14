import { FC } from 'react';
import cl from 'classnames';

import styles from './Tooltip.module.scss';

type TooltipProps = {
  text: string;
  emoji: string;
  position?: 'left' | 'right' | '';
};

const Tooltip: FC<TooltipProps> = ({ text, emoji, position }) => {
  const computedClassNames = cl(
    styles.tooltip,
    position === 'left' && styles.tooltip__left,
    position === 'right' && styles.tooltip__right,
  );

  return (
    <>
      <div className={computedClassNames}>
        {text}
        <div className={styles.tooltip__emoji}>{emoji}</div>
      </div>
      <div className={styles.tooltip__arrow}></div>
    </>
  );
};

export default Tooltip;
