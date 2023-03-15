import { useState, useEffect, useMemo } from 'react';

import { checkPermission, requestPermission } from 'utils/notifications';

import Toggle from 'components/Toggle';

import styles from './Subscription.module.scss';

const Subscription = () => {
  const [isEnabled, setIsEnabled] = useState(useMemo(() => checkPermission(), []));

  const handleToggle = () => {
    setIsEnabled((value) => !value);
  };

  useEffect(() => {
    if (isEnabled) {
      requestPermission();
    }
  }, [isEnabled]);

  return (
    <div className={styles.subscription}>
      Напоминать мне о новых словах
      <Toggle isEnabled={isEnabled} handleToggle={handleToggle} />
    </div>
  );
};

export default Subscription;
