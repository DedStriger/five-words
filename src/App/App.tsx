import { useState } from 'react';

import KeyBoard from 'components/KeyBoard';
import { BoardContext } from 'context/boardContext';
import { CELLS_IN_LINE } from 'utils/constants/boardSettings';

import Board from '../components/Board';

import './App.scss';

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

  const onEnter = () => {
    if (currentLine.cellpos !== CELLS_IN_LINE) {
      return;
    }
    console.log(board[currentLine.linepos].join(''));
    setCurrentLine({ linepos: currentLine.linepos + 1, cellpos: 0 });
  };

  return (
    <div className='app'>
      <BoardContext.Provider
        value={{ board, setBoard, currentLine, setCurrentLine, onAddChar, onDeleteChar, onEnter }}>
        <div className='play-zone'>
          <Board />
          <KeyBoard />
        </div>
      </BoardContext.Provider>
    </div>
  );
};

export default App;
