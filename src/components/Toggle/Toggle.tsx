import { FC } from 'react';
import cl from 'classnames';

import styles from './Toggle.module.scss';

type ToggleProps = {
  isEnabled: boolean;
  handleToggle: () => void;
};

const Toggle: FC<ToggleProps> = ({ isEnabled, handleToggle }) => {
  return (
    <button
      className={cl(styles.toggle, isEnabled && styles.toggle__enabled)}
      onClick={handleToggle}
      role='switch'
      aria-checked={isEnabled}
    />
  );
};

export default Toggle;
