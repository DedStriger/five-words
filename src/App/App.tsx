import { useState, useEffect, useMemo, Suspense } from 'react';
import cl from 'classnames';

import { BoardContext } from 'context/boardContext';

import { useCharsState } from 'hooks/useCharsState';
import { wordInWordsSet } from 'utils/word';
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
import Header from 'components/Header';

import './App.scss';
import { WORDS } from '../utils/constants/wordsList';

const LOCAL_STORAGE_KEY = 'banWords';
const END = 'end-game';

const getWord = () => {
  const banWords: string[] = window.localStorage.getItem(LOCAL_STORAGE_KEY)?.split('|') || [];
  return WORDS.filter((i) => !banWords.includes(i))[0] || END;
};

const App = () => {
  const [winningWord, setWinningWord] = useState(getWord());
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

  const { exactChars, emptyChars, existsChars, getCharsState, clear } = useCharsState(winningWord, board);
  const reset = () => {
    setBoard(INITIAL_BOARD);
    setCurrentLine(INITIAL_CURRENT_LINE);
    setIsGameOver(INITIAL_GAME_STATE);
    clear();
    setWinningLine(null);
    setLineShouldToShake(null);
    setIsEntered(false);
    const word = getWord();
    window.localStorage.setItem(
      'gameInfo',
      JSON.stringify({
        board: INITIAL_BOARD,
        currentLine: {
          linepos: 0,
          cellpos: 0,
        },
        existsChars: [],
        exactChars: [],
        emptyChars: [],
        isGameOver: {
          gameOver: false,
          win: false,
        },
        winningWord: word,
      }),
    );
    setWinningWord(word);
  };
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
      window.localStorage.setItem(LOCAL_STORAGE_KEY, `${window.localStorage.getItem(LOCAL_STORAGE_KEY) || ''}${winningWord}|`);
      return;
    }

    if (currentLine.linepos + 1 === TOTAL_LINES) {
      setIsGameOver({ gameOver: true, win: false });
      setIsEntered(true);
      window.localStorage.setItem(LOCAL_STORAGE_KEY, `${window.localStorage.getItem(LOCAL_STORAGE_KEY) || ''}${winningWord}|`);
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
    <div className={cl('app', isResultModalOpen && 'app__blur')}>
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
            {winningWord === END ? (
              <>
                <Header />
                <p
                  style={{
                    fontSize: 20,
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                  }}>
                  Слов больше нет) Скоро добавим еще!
                </p>{' '}
                <KeyBoard />
              </>
            ) : (
              <>
                <Header />
                <Board />
                <KeyBoard />
              </>
            )}
          </main>
          <ResultModal
            isOpen={isResultModalOpen}
            reset={reset}
            setOpen={setIsResultModalOpen}
            winningLine={currentLine.linepos}
            isWinning={isGameOver.win}
            winningWord={winningWord}
          />
        </Suspense>
      </BoardContext.Provider>
    </div>
  );
};

export default App;
