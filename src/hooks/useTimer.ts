import { useState, useEffect, useCallback } from 'react';

import { addZeroToTime } from 'utils/helpers/addZeroToTime';
import { showNotification } from 'utils/notifications';

type useTimerType = () => {
  hours: number | string;
  minutes: number | string;
  seconds: number | string;
};

export const useTimer: useTimerType = () => {
  const [hours, setHours] = useState<number | string>('00');
  const [minutes, setMinutes] = useState<number | string>('00');
  const [seconds, setSeconds] = useState<number | string>('00');

  const getTime = useCallback(() => {
    const currentDate = new Date();
    const tomorrowDate = new Date();

    tomorrowDate.setHours(0);
    tomorrowDate.setMinutes(0);
    tomorrowDate.setSeconds(0);

    const t = +tomorrowDate - +currentDate;

    if (t === 0) {
      showNotification();
    }

    setHours(addZeroToTime(Math.floor((t / (1000 * 60 * 60)) % 24)));
    setMinutes(addZeroToTime(Math.floor((t / (1000 * 60)) % 60)));
    setSeconds(addZeroToTime(Math.floor((t / 1000) % 60)));
  }, []);

  useEffect(() => {
    getTime();
    const interval = setInterval(() => {
      getTime();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [getTime]);

  return { hours, minutes, seconds };
};
