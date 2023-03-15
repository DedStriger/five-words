import { SHARE_TEXT, SHARE_TITLE, SHARE_URL } from 'utils/constants/shareSettings';
import styles from './ShareButton.module.scss';

const ShareButton = () => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: SHARE_TITLE,
        text: SHARE_TEXT,
        url: SHARE_URL,
      });
    }
  };

  return (
    <button className={styles.share} onClick={handleShare}>
      Рассказать друзьям
    </button>
  );
};

export default ShareButton;
