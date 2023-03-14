import { useState, useEffect, useMemo, lazy, Suspense } from 'react';

import { BoardContext } from 'context/boardContext';

import { useCharsState } from 'hooks/useCharsState';
import { wordInWordsSet, getWordOfDay } from 'utils/word';
import { sleep } from 'utils/helpers/sleep';
import {
  INITIAL_BOARD,
  INITIAL_CURRENT_LINE,
  INITIAL_GAME_STATE,
  CELLS_IN_LINE,
  TOTAL_LINES,
  CHAR_FLIP_DELAY,
  LINE_SHAKE_DURATION,
} from 'utils/constants/boardSettings';
import { getFieldFromLocalStorage, saveGameStateToLocalStorage } from 'utils/localStorage';
import { BoardType, GameType, LineType } from 'types/boardTypes';

import KeyBoard from 'components/KeyBoard';
import Board from '../components/Board';
import ResultModal from 'components/ResultModal';
import Gerb from 'components/Gerb';
import Header from 'components/Header';

import './App.scss';

const ResultBar = lazy(() => import('components/ResultBar'));

const App = () => {
  const winningWord = useMemo(() => getWordOfDay(), []);

  const [board, setBoard] = useState<BoardType>(
    useMemo(() => getFieldFromLocalStorage<BoardType>('board', winningWord) ?? INITIAL_BOARD, [winningWord]),
  );
  const [currentLine, setCurrentLine] = useState(
    useMemo(() => getFieldFromLocalStorage<LineType>('currentLine', winningWord) ?? INITIAL_CURRENT_LINE, [winningWord]),
  );
  const [isGameOver, setIsGameOver] = useState(
    useMemo(() => getFieldFromLocalStorage<GameType>('isGameOver', winningWord) ?? INITIAL_GAME_STATE, [winningWord]),
  );
  const [lineShouldToShake, setLineShouldToShake] = useState<number | null>(null);
  const [winningLine, setWinningLine] = useState<number | null>(null);
  const [isEntered, setIsEntered] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);

  const { exactChars, emptyChars, existsChars, getCharsState } = useCharsState(winningWord, board);

  const onAddChar = (value: string) => {
    if (currentLine.cellpos >= CELLS_IN_LINE) {
      return;
    }

    if (currentLine.linepos >= TOTAL_LINES) {
      return;
    }

    const copyBoard = [...board];
    copyBoard[currentLine.linepos][currentLine.cellpos] = value;

    setBoard(copyBoard);
    setCurrentLine({ ...currentLine, cellpos: currentLine.cellpos + 1 });
  };

  const onDeleteChar = () => {
    if (currentLine.cellpos === 0) {
      return;
    }
    const copyBoard = [...board];
    copyBoard[currentLine.linepos][currentLine.cellpos - 1] = '';

    setBoard(copyBoard);
    setCurrentLine({ ...currentLine, cellpos: currentLine.cellpos - 1 });
  };

  const onEnter = async () => {
    if (currentLine.cellpos !== CELLS_IN_LINE) {
      return;
    }

    const currentWord = board[currentLine.linepos].join('');

    if (!wordInWordsSet(currentWord)) {
      setLineShouldToShake(currentLine.linepos);
      await sleep(LINE_SHAKE_DURATION);
      setLineShouldToShake(null);
      return;
    }

    setCurrentLine({ linepos: currentLine.linepos + 1, cellpos: 0 });
    await sleep(CHAR_FLIP_DELAY * CELLS_IN_LINE);
    getCharsState();
    setIsEntered(true);

    if (currentWord === winningWord.toUpperCase()) {
      setWinningLine(currentLine.linepos);
      await sleep(1000);
      setIsGameOver({ gameOver: true, win: true });
      setIsEntered(true);
      return;
    }

    if (currentLine.linepos === TOTAL_LINES) {
      setIsGameOver({ gameOver: true, win: false });
      setIsEntered(true);
      return;
    }
  };

  useEffect(() => {
    if (isGameOver.gameOver) {
      setIsResultModalOpen(true);
    } else {
      setIsResultModalOpen(false);
    }
  }, [isGameOver.gameOver]);

  useEffect(() => {
    if (isEntered) {
      saveGameStateToLocalStorage({
        board,
        currentLine,
        existsChars,
        exactChars,
        emptyChars,
        isGameOver,
        winningWord,
      });
      setIsEntered(false);
    }
  }, [board, currentLine, emptyChars, exactChars, existsChars, isEntered, isGameOver, winningWord]);

  return (
    <div className='app'>
      <BoardContext.Provider
        value={{
          board,
          setBoard,
          currentLine,
          setCurrentLine,
          onAddChar,
          onDeleteChar,
          onEnter,
          exactChars,
          emptyChars,
          existsChars,
          winningWord,
          lineShouldToShake,
          winningLine,
        }}>
        <Suspense>
          <main className='play-zone'>
            <Header />
            <Board />
            {isGameOver.gameOver ? <ResultBar /> : <KeyBoard />}
            <Gerb />
          </main>
          <ResultModal isOpen={isResultModalOpen} setOpen={setIsResultModalOpen} />
        </Suspense>
      </BoardContext.Provider>
    </div>
  );
};

export default App;
