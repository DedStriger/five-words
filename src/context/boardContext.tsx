import { createContext } from 'react';

import { LineType, BoardType, GameType } from 'types/boardTypes';

export type BoardContextType = {
  board: BoardType;
  setBoard: (board: BoardType) => void;
  currentLine: LineType;
  setCurrentLine: ({ linepos, cellpos }: LineType) => void;
  onAddChar: (value: string) => void;
  onDeleteChar: () => void;
  onEnter: () => void;
  exactChars: string[];
  emptyChars: string[];
  existsChars: string[];
  winningWord: string;
  lineShouldToShake: number | null;
  setIsGameOver: (game: GameType) => void;
  winningLine: number | null;
};

export const BoardContext = createContext<BoardContextType | null>(null);
