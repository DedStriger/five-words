import { useState } from 'react';

import KeyBoard from 'components/KeyBoard';
import { BoardContext } from 'context/boardContext';

import Board from '../components/Board';

import './App.scss';

const initialBoard = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', 'Э', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
];

const App = () => {
  const [board, setBoard] = useState<string[][]>(initialBoard);
  const [currentValue, setCurrentValue] = useState<string[]>([]);

  const onAddValue = (value: string) => {
    setCurrentValue((chars) => {
      if (chars.length === 5) {
        return chars;
      }
      return [...chars, value];
    });
  };

  const onDeleteValue = () => {
    setCurrentValue([]);
  };

  return (
    <div className='app'>
      <BoardContext.Provider value={{ board, setBoard }}>
        <div className='play-zone'>
          <Board values={currentValue} />
          <KeyBoard onAddValue={onAddValue} onDeleteValue={onDeleteValue} />
        </div>
      </BoardContext.Provider>
    </div>
  );
};

export default App;
