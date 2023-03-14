import { useRef, useState, useEffect, useCallback } from 'react';
import { CELLS_IN_LINE } from 'utils/constants/boardSettings';

type useLineSizeType = (
  gap: number,
  percent: number,
) => {
  finallyWidth: number;
  fontSize: number;
  lineRef: React.RefObject<HTMLDivElement>;
};

export const useLineSize: useLineSizeType = (gap, percent) => {
  const lineRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);

  const board = document.querySelector('#board') as HTMLElement;
  const boardWidth = board?.clientWidth;
  const lineWidth = (lineHeight - (lineHeight * percent) / 100) * CELLS_IN_LINE + gap * (CELLS_IN_LINE - 1);

  const finallyWidth = lineWidth > boardWidth ? boardWidth : lineWidth;
  const fontSize = lineHeight / 2;

  const onLineHeight = useCallback(() => {
    if (lineRef.current) {
      const curHeight = lineRef.current?.clientHeight;
      setLineHeight(curHeight);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', onLineHeight);

    return () => {
      window.removeEventListener('resize', onLineHeight);
    };
  }, [onLineHeight]);

  useEffect(() => onLineHeight(), [onLineHeight]);

  return { finallyWidth, fontSize, lineRef };
};
