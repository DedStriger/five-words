import { createContext } from 'react';

type LineType = {
  linepos: number;
  cellpos: number;
};

export type BoardContextType = {
  board: string[][];
  setBoard: (board: string[][]) => void;
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
};

export const BoardContext = createContext<BoardContextType | null>(null);
