import { NOTY_TITLE, NOTY_BODY, NOTY_TAG, NOTY_LOGO } from 'utils/constants/notificationSettings';

const permission = Notification.permission;
const props = { title: NOTY_TITLE, body: NOTY_BODY, tag: NOTY_TAG, icon: NOTY_LOGO };

export const showNotification = () => {
  if (permission === 'granted') {
    return new Notification(NOTY_TITLE, { ...props });
  }
};

export const requestPermission = () => {
  Notification.requestPermission();
};

export const checkPermission = () => {
  switch (permission) {
    case 'granted':
      return true;
    case 'denied':
      return false;
    case 'default':
      return false;
    default:
      return false;
  }
};
