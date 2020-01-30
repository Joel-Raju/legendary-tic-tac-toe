import React from 'react';
import styled from 'styled-components';
import GridCell from './GridCell';
import { PlayerType, GameBoardState } from '../common/types';

const StyledBoard = styled.div`
  background: #bbada0;
  padding: 15px;
  width: 180px;
  height: 180px;

  .grid-row {
    display: flex;
    margin-bottom: 15px;
    flex-direction: row;
    justify-content: space-between;
  }

  .grid-row:last-child {
    margin-bottom: 0px;
  }
`;

interface Props {
  playerType: PlayerType;
  gameState: GameBoardState;
  isWon: boolean;
  onClick: (row: number, col: number) => any;
}

const GameBoard: React.FC<Props> = ({
  gameState,
  isWon,
  onClick,
  playerType
}) => {
  const handleClick = (row: number, col: number) => {
    if (gameState[row][col]) {
      return;
    }
    onClick(row, col);
  };

  const renderGrid = () => {
    const grid = [];
    const gridSize = 3;
    for (let row = 0; row < gridSize; row += 1) {
      const cells = [];
      for (let col = 0; col < gridSize; col += 1) {
        cells.push(
          <GridCell
            key={row + col}
            playerType={playerType}
            value={gameState[row][col]}
            onClick={() => handleClick(row, col)}
          />
        );
      }
      grid.push(
        <div className='grid-row' key={row}>
          {cells}
        </div>
      );
    }
    return grid;
  };

  return <StyledBoard>{renderGrid()}</StyledBoard>;
};

export default GameBoard;
