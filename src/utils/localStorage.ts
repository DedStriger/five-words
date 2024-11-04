import { BoardType, GameType, LineType } from 'types/boardTypes';

type gameInfoType = () => {
  board: BoardType;
  currentLine: LineType;
  exactChars: string[];
  emptyChars: string[];
  existsChars: string[];
  isGameOver: GameType;
  winningWord: string;
};

export const saveGameStateToLocalStorage = (gameInfo: ReturnType<typeof loadGameStateFromLocalStorage>, from: string) => {
  //console.log('set', from, gameInfo.board);
  localStorage.setItem('gameInfo', JSON.stringify(gameInfo));
};

export const loadGameStateFromLocalStorage: gameInfoType = () => {
  const state = localStorage.getItem('gameInfo');
  return state ? JSON.parse(state) : [];
};

export const getFieldFromLocalStorage = <T>(
  field: keyof ReturnType<typeof loadGameStateFromLocalStorage>,
  winningWord?: string,
) => {
  const state = loadGameStateFromLocalStorage();

  if (state.winningWord !== winningWord?.toLowerCase()) {
    return null;
  }
  return state[field] as T;
};
