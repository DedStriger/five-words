import { BOARD_RATIO } from 'utils/constants/boardSettings';

export const getBoardSize = (width: number, height: number) => {
  const w = Math.max(1, width);
  const h = Math.max(1, height);

  return w / h > BOARD_RATIO
    ? {
        width: BOARD_RATIO * h,
        height: h,
      }
    : {
        width: w,
        height: w / BOARD_RATIO,
      };
};
