import { useState } from 'react';

import { BoardType } from 'utils/types/boardTypes';

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
  const [exactChars, setExactChars] = useState<string[]>([]);
  const [emptyChars, setEmptyChars] = useState<string[]>([]);
  const [existsChars, setExistsChars] = useState<string[]>([]);

  const getCharsState = () => {
    const winningChars = winningWord.toUpperCase().split('');

    board.forEach((word) => {
      word.forEach((char, i) => {
        if (!winningChars.includes(char)) {
          return setEmptyChars((chars) => Array.from(new Set([...chars, char])));
        }

        if (char === winningChars[i]) {
          return setExactChars((chars) => Array.from(new Set([...chars, char])));
        }

        if (char !== winningChars[i]) {
          return setExistsChars((chars) => Array.from(new Set([...chars, char])));
        }
      });
    });
  };

  return { exactChars, emptyChars, existsChars, getCharsState };
};
