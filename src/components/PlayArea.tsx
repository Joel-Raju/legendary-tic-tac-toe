import React, { useContext } from 'react';
import styled from 'styled-components';
import { GlobalStoreContext } from '../context/globalReducer';
import GameBoard from './GameBoard';
import { PlayerType, GameplayState } from '../common/types';
import {
  isGameWon as isGameWonByPlayer,
  isBoardWon,
  getNextMove,
  isGameStarted,
  isMoveLeftInGame
} from '../common/gameplayUtils';
import {
  setGameState,
  setGameplayState,
  incrementWinCount
} from '../context/globalActions';

const StyledGame = styled.div`
  .board-wrapper {
    border-radius: 4px;
    background: #bbada0;
    padding: 8px;
  }

  .row {
    display: flex;
    flex-direction: row;
  }
`;

const PlayArea: React.FC = () => {
  const { state: appState, dispatch: dispatchToGlobal } = useContext(
    GlobalStoreContext
  );

  const updateGameplayState = () => {
    const { gameState, playerType, gridSize, botType } = appState;

    const isWonByPlayer = isGameWonByPlayer(gameState, playerType, gridSize);

    if (isWonByPlayer) {
      dispatchToGlobal(setGameplayState(GameplayState.PlayerWon));
      dispatchToGlobal(incrementWinCount());
      return;
    }

    const isWonByBot = isGameWonByPlayer(gameState, botType, gridSize);

    if (isWonByBot) {
      dispatchToGlobal(setGameplayState(GameplayState.PlayerLoose));
      return;
    }

    if (!isMoveLeftInGame(gameState, gridSize)) {
      dispatchToGlobal(setGameplayState(GameplayState.Draw));
    }
  };

  const makeMove = (
    boardIndex: number,
    row: number,
    col: number,
    value: PlayerType
  ) => {
    const { gameplayState } = appState;

    if (
      gameplayState === GameplayState.PlayerLoose ||
      gameplayState === GameplayState.PlayerWon ||
      gameplayState === GameplayState.Draw
    ) {
      return;
    }

    if (
      appState.gameplayState === GameplayState.NotStarted &&
      !isGameStarted(appState.gameState, appState.gridSize)
    ) {
      dispatchToGlobal(setGameplayState(GameplayState.Started));
    }

    const boardState = appState.gameState[boardIndex].slice();
    boardState[row][col] = value;

    dispatchToGlobal(setGameState(boardIndex, boardState));

    updateGameplayState();
  };

  const onPlayerMove = (
    boardIndex: number,
    row: number,
    col: number,
    playerType: PlayerType
  ) => {
    if (!appState.playerType || !appState.botType) {
      return;
    }

    makeMove(boardIndex, row, col, playerType);

    const opponentMove = getNextMove(
      appState.gameState,
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
    const boardState = appState.gameState[boardIndex];
    return !!isBoardWon(boardState, appState.playerType, appState.gridSize);
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
              gameState={appState.gameState[bIndex]}
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
        <div className='row' key={row}>
          {rowBoards}
        </div>
      );
    }

    return gameBoards;
  };

  return (
    <StyledGame>
      <div className='board-wrapper'>{renderGameBoards()}</div>
    </StyledGame>
  );
};

export default PlayArea;
