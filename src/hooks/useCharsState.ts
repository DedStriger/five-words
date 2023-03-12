import { useState, useCallback, useMemo } from 'react';

import { setChars } from 'utils/helpers/setChars';
import { getFieldFromLocalStorage } from 'utils/localStorage';
import { BoardType } from 'types/boardTypes';

type useCharsStateType = (
  winningWord: string,
  board: BoardType,
) => {
  exactChars: string[];
  emptyChars: string[];
  existsChars: string[];
  getCharsState: () => void;
};

export const useCharsState: useCharsStateType = (winningWord, board) => {
  const [exactChars, setExactChars] = useState<string[]>(
    useMemo(() => getFieldFromLocalStorage<string[]>('exactChars', winningWord) ?? [], [winningWord]),
  );
  const [emptyChars, setEmptyChars] = useState<string[]>(
    useMemo(() => getFieldFromLocalStorage<string[]>('emptyChars', winningWord) ?? [], [winningWord]),
  );
  const [existsChars, setExistsChars] = useState<string[]>(
    useMemo(() => getFieldFromLocalStorage<string[]>('existsChars', winningWord) ?? [], [winningWord]),
  );

  const getCharsState = useCallback(() => {
    const winningChars = winningWord.toUpperCase().split('');

    board.forEach((word) => {
      word.forEach((char, i) => {
        if (!winningChars.includes(char)) {
          setEmptyChars((chars) => setChars(chars, char));
          return;
        }

        if (char === winningChars[i]) {
          setExactChars((chars) => setChars(chars, char));
          return;
        }

        if (char !== winningChars[i]) {
          setExistsChars((chars) => setChars(chars, char));
          return;
        }
      });
    });
  }, [board, winningWord]);

  return { exactChars, emptyChars, existsChars, getCharsState };
};
