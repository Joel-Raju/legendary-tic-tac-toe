import { GameBoardState, PlayerType } from "./types";

export const getWinConfigs = (
  gridSize: number
): Array<Array<Array<number>>> => {
  let winningConfigs: any = [];
  const leftDiagConfig = [];
  const rightDiagConfig = [];

  for (let x = 0; x < gridSize; x += 1) {
    const horizontalConfig = [];
    const verticalConfig = [];
    for (let y = 0; y < gridSize; y += 1) {
      horizontalConfig.push([x, y]);
      verticalConfig.push([y, x]);
      if (x === y) {
        leftDiagConfig.push([x, y]);
      }

      if (x + y === gridSize - 1) {
        rightDiagConfig.push([x, y]);
      }
    }
    winningConfigs = [...winningConfigs, horizontalConfig, verticalConfig];
  }

  winningConfigs = [...winningConfigs, leftDiagConfig, rightDiagConfig];

  return winningConfigs;
};

/**
 * If won returns the winning row / col / diagoal indices or else undefined
 * @param gameState Game State of a board
 * @returns
 */

export const isBoardWon = (
  gameState: GameBoardState
): Array<Array<number>> | false => {
  if (
    gameState[0][0] &&
    gameState[0][0] === gameState[0][1] &&
    gameState[0][1] === gameState[0][2]
  ) {
    return [
      [0, 0],
      [0, 1],
      [0, 2]
    ];
  }

  if (
    gameState[1][0] &&
    gameState[1][0] === gameState[1][1] &&
    gameState[1][1] === gameState[1][2]
  ) {
    return [
      [1, 0],
      [1, 1],
      [1, 2]
    ];
  }

  if (
    gameState[2][0] &&
    gameState[2][0] === gameState[2][1] &&
    gameState[2][1] === gameState[2][2]
  ) {
    return [
      [2, 0],
      [2, 1],
      [2, 2]
    ];
  }

  if (
    gameState[0][0] &&
    gameState[0][0] === gameState[1][0] &&
    gameState[1][0] === gameState[2][0]
  ) {
    return [
      [0, 0],
      [1, 0],
      [2, 0]
    ];
  }

  if (
    gameState[0][1] &&
    gameState[0][1] === gameState[1][1] &&
    gameState[1][1] === gameState[2][1]
  ) {
    return [
      [0, 1],
      [1, 1],
      [2, 1]
    ];
  }

  if (
    gameState[0][2] &&
    gameState[0][2] === gameState[1][2] &&
    gameState[1][2] === gameState[2][2]
  ) {
    return [
      [0, 2],
      [1, 2],
      [2, 2]
    ];
  }

  if (
    gameState[0][0] &&
    gameState[0][0] === gameState[1][1] &&
    gameState[1][1] === gameState[2][2]
  ) {
    return [
      [0, 0],
      [1, 1],
      [2, 2]
    ];
  }

  if (
    gameState[0][2] &&
    gameState[0][2] === gameState[1][1] &&
    gameState[1][1] === gameState[2][0]
  ) {
    return [
      [0, 2],
      [1, 1],
      [2, 0]
    ];
  }

  return false;
};

export const isGameWon = (
  gameBoards: Array<GameBoardState>,
  numberOfBoards: number
) => {
  // return (
  //   (isBoardWon(0) && isBoardWon(1) && isBoardWon(2)) ||
  //   (isBoardWon(3) && isBoardWon(4) && isBoardWon(5)) ||
  //   (isBoardWon(6) && isBoardWon(7) && isBoardWon(8)) ||
  //   (isBoardWon(0) && isBoardWon(3) && isBoardWon(6)) ||
  //   (isBoardWon(1) && isBoardWon(4) && isBoardWon(7)) ||
  //   (isBoardWon(2) && isBoardWon(5) && isBoardWon(8)) ||
  //   (isBoardWon(0) && isBoardWon(4) && isBoardWon(8)) ||
  //   (isBoardWon(2) && isBoardWon(4) && isBoardWon(6))
  // );
  return false;
};

export const getInitialGameState = (boardCount: number, gridSize: number) => {
  const initialState = new Array(boardCount);
  for (let board = 0; board < boardCount; board += 1) {
    const rowCount = gridSize;
    const gameGrid = new Array(3);
    for (let j = 0; j < rowCount; j += 1) {
      gameGrid[j] = new Array(gridSize);
    }
    initialState[board] = gameGrid;
  }

  return initialState;
};

export const getWinningMove = (
  gameState: GameBoardState,
  playerType: PlayerType,
  gridSize: number
): Array<number> | undefined => {
  const winningConfigs = getWinConfigs(gridSize);
  let winningMove: Array<number> = [];

  winningConfigs.forEach(config => {
    const [pos1, pos2, pos3] = config;

    if (
      gameState[pos1[0]][pos1[1]] === playerType &&
      gameState[pos1[0]][pos1[1]] === gameState[pos2[0]][pos2[1]] &&
      !winningMove.length
    ) {
      winningMove = pos3;
    }

    if (
      gameState[pos1[0]][pos1[1]] === playerType &&
      gameState[pos1[0]][pos1[1]] === gameState[pos3[0]][pos3[1]] &&
      !winningMove.length
    ) {
      winningMove = pos2;
    }

    if (
      gameState[pos2[0]][pos2[1]] === playerType &&
      gameState[pos2[0]][pos2[1]] === gameState[pos3[0]][pos3[1]] &&
      !winningMove.length
    ) {
      winningMove = pos1;
    }
  });

  return winningMove.length ? winningMove : undefined;
};

export const getWinningBoards = (
  gameBoards: Array<GameBoardState>,
  playerType: PlayerType,
  gridSize: number
) => {
  const winningBoards: { [key: number]: GameBoardState } = [];

  gameBoards.forEach((board, index) => {
    if (!isBoardWon(board)) {
      const winningMove = getWinningMove(board, playerType, gridSize);
      if (winningMove) {
        winningBoards[index] = board;
      }
    }
  });
  return winningBoards;
};

export const getGameWinningBoard = (gameBoards: Array<GameBoardState>) => {};

export const getBoardToPlay = () => {};
