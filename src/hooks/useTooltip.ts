import { useCallback, useEffect, useRef, useState } from 'react';

import { TOP_LINE, BOTTOM_LINE, MID_LINE } from 'utils/constants/keyBoardSettings';

type useTooltipType = (
  isNotFoundCell: boolean,
  isNotFoundLine: boolean | undefined,
  closeDelay: number,
  showDelay: number,
) => {
  isVisibleTooltip: boolean;
  handleClick: () => void;
  containerRef: React.RefObject<HTMLDivElement>;
};

export const useTooltip: useTooltipType = (
  isNotFoundCell,
  isNotFoundLine,
  closeDelay,
  showDelay,
) => {
  const [isVisibleTooltip, setIsVisibleTooltip] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(() => {
    if (!isNotFoundCell) {
      setIsVisibleTooltip((value) => !value);
    }
  }, [isNotFoundCell]);

  // check when clicked outside of tooltip
  useEffect(() => {
    const listener = (e: MouseEvent | KeyboardEvent) => {
      if (!containerRef?.current?.contains(e.target as HTMLDivElement)) {
        setIsVisibleTooltip(false);
      }
    };
    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('click', listener);
    };
  }, []);

  // check when press key
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();

      const availableKeys = [...TOP_LINE, ...BOTTOM_LINE, ...MID_LINE];
      const isKeyExists =
        availableKeys.indexOf(key.toUpperCase()) > 0 || key === 'ENTER' || key === 'BACKSPACE';

      if (isKeyExists) {
        setIsVisibleTooltip(false);
      }
    };
    document.addEventListener('keydown', listener);

    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, []);

  // close tooltip with delay
  useEffect(() => {
    if (isVisibleTooltip) {
      const timeOut = setTimeout(() => {
        setIsVisibleTooltip(false);
      }, closeDelay);

      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [isVisibleTooltip, closeDelay]);

  // show tooltip with delay when line notfound
  useEffect(() => {
    if (isNotFoundLine) {
      const timeOut = setTimeout(() => {
        setIsVisibleTooltip(true);
      }, showDelay);

      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [isNotFoundLine, showDelay]);

  return { isVisibleTooltip, handleClick, containerRef };
};
