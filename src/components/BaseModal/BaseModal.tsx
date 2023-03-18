import { forwardRef } from 'react';

import styles from './BaseModal.module.scss';

type BaseModalProps = {
  children: React.ReactNode;
};

type Ref = HTMLDivElement;

const BaseModal = forwardRef<Ref, BaseModalProps>(({ children }, ref) => {
  return (
    <div className={styles.root}>
      <div ref={ref} className={styles.overlay}>
        {children}
      </div>
    </div>
  );
});

export default BaseModal;
