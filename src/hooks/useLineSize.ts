import { useRef, useState, useEffect, useCallback } from 'react';

import { BOARD_HORIZONTAL_GAP, BOARD_VERTICAL_GAP, CELLS_IN_LINE, TOTAL_LINES } from 'utils/constants/boardSettings';
import { getBoardSize } from 'utils/helpers/getBoardSize';

type useLineSizeType = () => {
  containerRef: React.RefObject<HTMLDivElement>;
  containerSize: { width: number; height: number };
  fontSize: number;
};

export const useBoardSize: useLineSizeType = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<NodeJS.Timeout | null>(null);

  const [sizes, setSizes] = useState({ width: 0, height: 0 });
  const [fontSize, setFontSize] = useState(0);

  const onSizes = useCallback(() => {
    if ((timeRef.current && clearTimeout(timeRef.current), containerRef.current)) {
      const container = containerRef.current;
      const x = container.clientWidth;
      const y = container.clientHeight;
      const totalRowGap = (CELLS_IN_LINE - 1) * BOARD_HORIZONTAL_GAP;
      const totalColumnGap = (TOTAL_LINES - 1) * BOARD_VERTICAL_GAP;

      const cellSizes = getBoardSize((x - totalRowGap) / CELLS_IN_LINE, (y - totalColumnGap) / TOTAL_LINES);
      const width = cellSizes.width;
      const height = cellSizes.height;

      if (width <= 1 || height <= 1) {
        timeRef.current = setTimeout(() => {
          onSizes();
        });
      } else {
        setSizes({
          width: width * CELLS_IN_LINE + totalRowGap,
          height: height * TOTAL_LINES + totalColumnGap,
        });
        setFontSize(height / 2);
      }
    }
  }, []);

  useEffect(() => {
    onSizes();
    window.addEventListener('resize', onSizes);

    return () => {
      window.removeEventListener('resize', onSizes);
    };
  }, [onSizes]);

  useEffect(() => {
    return () => {
      if (timeRef.current) {
        clearTimeout(timeRef.current);
      }
    };
  }, []);

  return { containerRef, containerSize: sizes, fontSize };
};
