import { useRef, useState, useEffect, useCallback, useLayoutEffect } from 'react';
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

  const [width, setWidth] = useState(0);
  const [fontSize, setFontSize] = useState(0);

  const onWidth = useCallback(() => {
    const lineHeight = lineRef.current ? lineRef.current?.clientHeight : 0;
    const lineWidth = (lineHeight - (lineHeight * percent) / 100) * CELLS_IN_LINE + gap * (CELLS_IN_LINE - 1);

    const board = document.querySelector('#board') as HTMLElement;
    const boardWidth = board?.clientWidth;
    const finallyWidth = lineWidth > boardWidth ? boardWidth : lineWidth;

    setWidth(finallyWidth);
    setFontSize(lineHeight / 2);
  }, [gap, percent]);

  useEffect(() => {
    window.addEventListener('resize', onWidth);

    return () => {
      window.removeEventListener('resize', onWidth);
    };
  }, [onWidth]);

  useLayoutEffect(() => onWidth(), [onWidth]);

  return { finallyWidth: width, fontSize, lineRef };
};
