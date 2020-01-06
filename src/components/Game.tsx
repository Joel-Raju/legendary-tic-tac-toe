import React from "react";
import styled from "styled-components";
import reducer, {
  State as AppState,
  InitialState as AppInitialState,
  Action as AppAction
} from "../store/gameReducer";
import GameBoard from "./GameBoard";
import { PlayerType } from "../common/types";
import {
  isBoardWon,
  getInitialGameState,
  getNextMove
} from "../common/gameplayUtils";
import Button from "./Button";
import { ActionTypes } from "../store/actionTypes";

const StyledGame = styled.div`
  border-radius: 3px;

  row {
    display: flex;
    flex-direction: row;
  }
`;

const Game: React.FC = () => {
  const [appState, dispatch] = React.useReducer<
    React.Reducer<AppState, AppAction>
  >(reducer, AppInitialState);

  const [gameState, setGameState] = React.useState(
    getInitialGameState(appState.boardCount, appState.gridSize)
  );

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

  const onPlayerMove = (
    boardIndex: number,
    row: number,
    col: number,
    playerType: PlayerType
  ) => {
    makeMove(boardIndex, row, col, playerType);

    const opponentMove = getNextMove(
      gameState,
      appState.botType,
      appState.gridSize,
      appState.boardCount
    );

    if (opponentMove) {
      const keys = Object.keys(opponentMove);
      const bIndex = parseInt(keys[0], 10);
      const [rowIdx, colIdx] = opponentMove[bIndex];

      makeMove(bIndex, rowIdx, colIdx, appState.botType);
    }
  };

  const isGameBoardWon = (boardIndex: number) => {
    const boardState = gameState[boardIndex];
    return !!isBoardWon(boardState, appState.playerType, appState.gridSize);
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
    setGameState(getInitialGameState(appState.boardCount, appState.gridSize));
    dispatch({ type: ActionTypes.INCREMENT_NUM_OF_GAMES });
  };

  const renderGameBoards = () => {
    const gridSize = 3;
    const gameBoards: any = [];

    for (let row = 0, boardIndex = 0; row < gridSize; row += 1) {
      const rowBoards = [];
      for (let col = 0; col < gridSize; col += 1) {
        // eslint-disable-next-line no-loop-func
        (bIndex => {
          rowBoards.push(
            <GameBoard
              key={row + col}
              playerType={appState.playerType}
              gameState={gameState[bIndex]}
              isWon={isGameBoardWon(bIndex)}
              onClick={
                (bRow, bCol) =>
                  onPlayerMove(bIndex, bRow, bCol, appState.playerType)
                // eslint-disable-next-line react/jsx-curly-newline
              }
            />
          );
          boardIndex += 1;
        })(boardIndex);
      }
      gameBoards.push(
        <div className="row" key={row}>
          {rowBoards}
        </div>
      );
    }

    return gameBoards;
  };

  return (
    <StyledGame>
      <div>
        <Button onClick={startNewGame}>New Game</Button>
        Is game won:
        {isGameWon() ? "true" : "false"}
      </div>
      {renderGameBoards()}
    </StyledGame>
  );
};

export default Game;
