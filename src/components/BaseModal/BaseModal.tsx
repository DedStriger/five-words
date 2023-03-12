import { FC } from 'react';

import styles from './BaseModal.module.scss';

type BaseModalProps = {
  children: React.ReactNode;
};

const BaseModal: FC<BaseModalProps> = ({ children }) => {
  return (
    <div className={styles.root}>
      <div className={styles.overlay}>{children}</div>
    </div>
  );
};

export default BaseModal;
