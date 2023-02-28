import { useState } from 'react';

import { wordInWordsSet } from 'utils/helpers/wordInWordsSet';
import { sleep } from 'utils/helpers/sleep';
import { useCharsState } from 'hooks/useCharsState';
import {
  INITIAL_BOARD,
  CELLS_IN_LINE,
  TOTAL_LINES,
  CHAR_FLIP_DELAY,
} from 'utils/constants/boardSettings';

import KeyBoard from 'components/KeyBoard';
import Board from '../components/Board';
import { BoardContext } from 'context/boardContext';

import './App.scss';

const App = () => {
  const [board, setBoard] = useState<string[][]>(INITIAL_BOARD);
  const [currentLine, setCurrentLine] = useState({ linepos: 0, cellpos: 0 });
  const [lineShouldToShake, setLineShouldToShake] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState({});
  const winningWord = 'дупло';

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
      await sleep(250);
      setLineShouldToShake(null);
      return;
    }

    setCurrentLine({ linepos: currentLine.linepos + 1, cellpos: 0 });
    await sleep(CHAR_FLIP_DELAY * CELLS_IN_LINE);
    getCharsState();

    if (currentWord === winningWord.toUpperCase()) {
      setGameOver({ gameOver: true, win: true });
      return;
    }

    if (currentLine.linepos === TOTAL_LINES) {
      setGameOver({ gameOver: true, win: false });
      return;
    }
  };

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
        }}>
        <main className='play-zone'>
          <Board />
          <KeyBoard />
        </main>
      </BoardContext.Provider>
    </div>
  );
};

export default App;
