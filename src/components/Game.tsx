import React from 'react';
import styled from 'styled-components';
import reducer, {
  State as AppState,
  InitialState as AppInitialState,
  Action as AppAction
} from '../store/gameReducer';
import GameBoard from './GameBoard';
import { PlayerType } from '../common/types';
import { isBoardWon } from '../common/utils';
import Button from './Button';
import { ActionTypes } from '../store/actionTypes';

const StyledGame = styled.div`
  border-radius: 3px;

  row {
    display: flex;
    flex-direction: row;
  }
`;

const getInitialGameState = () => {
  const gameBoardCount = 9;
  const gridSize = 3;
  const initialState = new Array(gameBoardCount);
  for (let board = 0; board < gameBoardCount; board += 1) {
    const rowCount = gridSize;
    const gameGrid = new Array(3);
    for (let j = 0; j < rowCount; j += 1) {
      gameGrid[j] = new Array(gridSize);
    }
    initialState[board] = gameGrid;
  }

  return initialState;
};

const Game: React.FC = () => {
  const gameBoardCount = 9;

  const [gameState, setGameState] = React.useState(getInitialGameState());

  const [appState, dispatch] = React.useReducer<
    React.Reducer<AppState, AppAction>
  >(reducer, AppInitialState);

  const makeMove = (
    boardIndex: number,
    row: number,
    col: number,
    value: PlayerType
  ) => {
    const boardState = gameState[boardIndex].slice();
    boardState[row][col] = value;
    setGameState(prevState => [
      ...prevState.slice(0, boardIndex),
      boardState,
      ...prevState.slice(boardIndex + 1)
    ]);
  };

  const isGameBoardWon = (boardIndex: number) => {
    const boardState = gameState[boardIndex];
    return !!isBoardWon(boardState);
  };

  const isGameWon = () => {
    return (
      (isGameBoardWon(0) && isGameBoardWon(1) && isGameBoardWon(2)) ||
      (isGameBoardWon(3) && isGameBoardWon(4) && isGameBoardWon(5)) ||
      (isGameBoardWon(6) && isGameBoardWon(7) && isGameBoardWon(8)) ||
      (isGameBoardWon(0) && isGameBoardWon(3) && isGameBoardWon(6)) ||
      (isGameBoardWon(1) && isGameBoardWon(4) && isGameBoardWon(7)) ||
      (isGameBoardWon(2) && isGameBoardWon(5) && isGameBoardWon(8)) ||
      (isGameBoardWon(0) && isGameBoardWon(4) && isGameBoardWon(8)) ||
      (isGameBoardWon(2) && isGameBoardWon(4) && isGameBoardWon(6))
    );
  };

  const startNewGame = () => {
    setGameState(getInitialGameState());
    dispatch({ type: ActionTypes.INCREMENT_NUM_OF_GAMES });
  };

  const renderGameBoards = () => {
    const gridSize = 3;
    const gameBoards: any = [];

    for (let row = 0, boardIndex = 0; row < gridSize; row += 1) {
      const rowBoards = [];
      (bIndex => {
        for (let col = 0; col < gridSize; col += 1) {
          rowBoards.push(
            <GameBoard
              key={row + col}
              playerType={appState.playerType}
              gameState={gameState[boardIndex]}
              isWon={isGameBoardWon(boardIndex)}
              onClick={(bRow, bCol) =>
                makeMove(bIndex, bRow, bCol, appState.playerType)
              }
            />
          );
          boardIndex += 1;
        }
        gameBoards.push(
          <div className='row' key={row}>
            {rowBoards}
          </div>
        );
      })(boardIndex);
    }

    return gameBoards;
  };

  return (
    <StyledGame>
      <div>
        <Button onClick={startNewGame}>New Game</Button>
        Is game won:
        {isGameWon() ? 'true' : 'false'}
      </div>
      {renderGameBoards()}
    </StyledGame>
  );
};

export default Game;
