import { FC, lazy } from 'react';
import { createPortal } from 'react-dom';
import cl from 'classnames';

import { ReactComponent as CrossIc } from 'assets/images/cross.svg';

import { TOTAL_LINES } from 'utils/constants/boardSettings';

import Timer from 'components/Timer';
import Subscription from 'components/Subscription';
import ShareButton from 'components/ShareButton';

import styles from './ResultModal.module.scss';

const BaseModal = lazy(() => import('components/BaseModal'));

type ResultModalProps = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  winningLine: number;
  isWinning: boolean;
  winningWord: string;
};

const ResultModal: FC<ResultModalProps> = ({ isOpen, setOpen, winningLine, isWinning, winningWord }) => {
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
          <div className={styles.modal__title}>{isWinning ? 'Вы отгадали слово!' : 'Вы не отгадали слово'}</div>
          {!isWinning && (
            <div>
              <div className={styles.modal__rightword_title}>Мы загадили:</div>
              <div className={styles.modal__rightword}>{winningWord}</div>
            </div>
          )}
          <Timer />
          <Subscription />
          {isWinning && (
            <>
              <div className={styles.attempts__title}>
                Количество попыток:
                <div className={styles.attempts__wrapper}>
                  <span className={cl(styles.attempts, styles.attempts__success)}>{winningLine}</span>
                  <span className={styles.attempts}>/</span>
                  <span className={styles.attempts}>{TOTAL_LINES}</span>
                </div>
              </div>
              <ShareButton />
            </>
          )}
        </div>
      </BaseModal>
    ),
    rootRef,
  );
};

export default ResultModal;
