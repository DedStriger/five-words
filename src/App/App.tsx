import { useState } from 'react';

import KeyBoard from 'components/KeyBoard';
import { BoardContext } from 'context/boardContext';
import { CELLS_IN_LINE, CHAR_FLIP_DELAY } from 'utils/constants/boardSettings';

import Board from '../components/Board';

import './App.scss';
import { wordInWordsSet } from 'utils/helpers/wordInWordsSet';
import { sleep } from 'utils/helpers/sleep';

const initialBoard = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
];

const App = () => {
  const [board, setBoard] = useState<string[][]>(initialBoard);
  const [currentLine, setCurrentLine] = useState({ linepos: 0, cellpos: 0 });
  const [exactChars, setExactChars] = useState<string[]>([]);
  const [emptyChars, setEmptyChars] = useState<string[]>([]);
  const [existsChars, setExistsChars] = useState<string[]>([]);
  const [lineShouldToShake, setLineShouldToShake] = useState<number | null>(null);

  const winningWord = 'дупло';

  const getExactChars = () => {
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

  const onAddChar = (value: string) => {
    if (currentLine.cellpos >= CELLS_IN_LINE) {
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
      // console.log(currentLine);
      return setTimeout(() => setLineShouldToShake(null), 1000);
    }

    // setTimeout(getExactChars, CHAR_FLIP_DELAY * CELLS_IN_LINE);
    setCurrentLine({ linepos: currentLine.linepos + 1, cellpos: 0 });
    await sleep(CHAR_FLIP_DELAY * CELLS_IN_LINE);
    getExactChars();

    if (currentWord === winningWord.toUpperCase()) {
      alert('Krasava');
    }

    // console.log(wordInWordsSet(currentWord));
    // console.log(board[currentLine.linepos].join(''));
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
        <div className='play-zone'>
          <Board />
          <KeyBoard />
        </div>
      </BoardContext.Provider>
    </div>
  );
};

export default App;
