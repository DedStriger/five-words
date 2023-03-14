import { FC, lazy } from 'react';
import { createPortal } from 'react-dom';

import { ReactComponent as CrossIc } from 'assets/images/cross.svg';

import Timer from 'components/Timer';

import styles from './ResultModal.module.scss';

const BaseModal = lazy(() => import('components/BaseModal'));

type ResultModalProps = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};

const ResultModal: FC<ResultModalProps> = ({ isOpen, setOpen }) => {
  const rootRef = document.getElementById('root') as HTMLElement;

  const handleCloseModal = () => {
    setOpen(false);
  };

  return createPortal(
    isOpen && (
      <BaseModal>
        <div className={styles.modal}>
          <div className={styles.modal__close}>
            <button className={styles.modal__icon} onClick={handleCloseModal}>
              <CrossIc />
            </button>
          </div>
          <div className={styles.modal__title}>Вы отгадали слово!</div>
          <Timer />
        </div>
      </BaseModal>
    ),
    rootRef,
  );
};

export default ResultModal;
