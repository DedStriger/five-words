import { FC, useContext, useMemo } from 'react';
import cl from 'classnames';

import { BoardContext, BoardContextType } from 'context/boardContext';
import { useTooltip } from 'hooks/useTooltip';
import { EMPTY__TOOLTIP, EXACT__TOOLTIP, EXIST__TOOLTIP, NOTFOUND__TOOLTIP } from 'utils/constants/tooltipSettings';
import { CELLS_IN_LINE, CHAR_FLIP_DELAY, LINE_SHAKE_DURATION } from 'utils/constants/boardSettings';

import Tooltip from 'components/Tooltip';

import styles from './Cell.module.scss';

type CellProps = {
  cellPos: number;
  linePos: number;
  isNotFoundLine?: boolean;
  isWinningLine: boolean;
};

const Cell: FC<CellProps> = ({ cellPos, linePos, isNotFoundLine, isWinningLine }) => {
  const { board, winningWord, currentLine } = useContext(BoardContext) as BoardContextType;

  const char = board[linePos][cellPos];

  const isPassedLine = currentLine.linepos > linePos;
  const isActive = !isPassedLine && !!char;
  const isExact = isPassedLine && winningWord[cellPos].toUpperCase() === char.toUpperCase();

  const isExists = isPassedLine && !isExact && winningWord.toUpperCase().indexOf(char.toUpperCase()) !== -1 && char !== '';
  const isEmpty = isPassedLine && !isExact && !isExists;
  const isNotFoundCell = currentLine.linepos === linePos && cellPos === 0 && !!char;

  const { isVisibleTooltip, handleClick, containerRef } = useTooltip(
    isNotFoundCell,
    isNotFoundLine,
    CHAR_FLIP_DELAY * CELLS_IN_LINE,
    LINE_SHAKE_DURATION,
  );

  const computedClassNames = cl(
    styles.cell,
    isEmpty && styles.cell_empty,
    isActive && styles.cell_active,
    isExists && styles.cell_exists,
    isExact && styles.cell_exact,
    isWinningLine && styles.cell_win,
  );

  const renderTooltip = useMemo(() => {
    const getTooltipPosition = () => {
      switch (cellPos) {
        case 0:
          return 'left';
        case 4:
          return 'right';
        default:
          return '';
      }
    };

    if (isPassedLine && isEmpty) {
      return <Tooltip text={EMPTY__TOOLTIP.text} emoji={EMPTY__TOOLTIP.emoji} position={getTooltipPosition()} />;
    }

    if (isPassedLine && isExact) {
      return <Tooltip text={EXACT__TOOLTIP.text} emoji={EXACT__TOOLTIP.emoji} position={getTooltipPosition()} />;
    }

    if (isPassedLine && isExists) {
      return <Tooltip text={EXIST__TOOLTIP.text} emoji={EXIST__TOOLTIP.emoji} position={getTooltipPosition()} />;
    }

    if (isNotFoundCell) {
      return <Tooltip text={NOTFOUND__TOOLTIP.text} emoji={NOTFOUND__TOOLTIP.emoji} position={getTooltipPosition()} />;
    }

    return null;
  }, [isEmpty, isExact, isExists, isNotFoundCell, isPassedLine, cellPos]);

  return (
    <div className={styles.root}>
      <div className={computedClassNames} onClick={handleClick} ref={containerRef}>
        {char}
      </div>
      {isVisibleTooltip && renderTooltip}
    </div>
  );
};

export default Cell;
