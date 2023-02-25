import { createContext } from 'react';

export type BoardContextType = {
  board: string[][];
  setBoard: (value: string[][]) => void;
};

export const BoardContext = createContext<BoardContextType | null>(null);
