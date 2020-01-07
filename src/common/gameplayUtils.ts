import { GameBoardState, PlayerType } from "./types";

const getRandomInt = (max: number) =>
  Math.floor(Math.random() * Math.floor(max));

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
  gameState: GameBoardState,
  playerType: PlayerType,
  gridSize: number
): Array<Array<number>> | undefined => {
  const possibleWinningConfigs = getWinConfigs(gridSize);
  let wonConfig: Array<Array<number>> = [];

  possibleWinningConfigs.forEach(config => {
    const [c1, c2, c3] = config;
    const [x1, y1] = c1;
    const [x2, y2] = c2;
    const [x3, y3] = c3;

    if (
      gameState[x1][y1] === playerType &&
      gameState[x1][y1] === gameState[x2][y2] &&
      gameState[x2][y2] === gameState[x3][y3] &&
      !wonConfig.length
    ) {
      wonConfig = [c1, c2, c3];
    }
  });

  if (wonConfig.length) {
    return wonConfig;
  }

  return undefined;
};

export const getEmptyPositions = (
  gamestate: GameBoardState,
  gridSize: number
): Array<number[]> => {
  const emptyPositions: Array<number[]> = [];

  for (let x = 0; x < gridSize; x += 1) {
    for (let y = 0; y < gridSize; y += 1) {
      if (!gamestate[x][y]) {
        emptyPositions.push([x, y]);
      }
    }
  }

  return emptyPositions;
};

export const isGameWon = (
  gameBoards: Array<GameBoardState>,
  playerType: PlayerType,
  gridSize: number
) => {
  return (
    (isBoardWon(gameBoards[0], playerType, gridSize) &&
      isBoardWon(gameBoards[1], playerType, gridSize) &&
      isBoardWon(gameBoards[2], playerType, gridSize)) ||
    (isBoardWon(gameBoards[3], playerType, gridSize) &&
      isBoardWon(gameBoards[4], playerType, gridSize) &&
      isBoardWon(gameBoards[5], playerType, gridSize)) ||
    (isBoardWon(gameBoards[6], playerType, gridSize) &&
      isBoardWon(gameBoards[7], playerType, gridSize) &&
      isBoardWon(gameBoards[8], playerType, gridSize)) ||
    (isBoardWon(gameBoards[0], playerType, gridSize) &&
      isBoardWon(gameBoards[3], playerType, gridSize) &&
      isBoardWon(gameBoards[6], playerType, gridSize)) ||
    (isBoardWon(gameBoards[1], playerType, gridSize) &&
      isBoardWon(gameBoards[4], playerType, gridSize) &&
      isBoardWon(gameBoards[7], playerType, gridSize)) ||
    (isBoardWon(gameBoards[2], playerType, gridSize) &&
      isBoardWon(gameBoards[5], playerType, gridSize) &&
      isBoardWon(gameBoards[8], playerType, gridSize)) ||
    (isBoardWon(gameBoards[0], playerType, gridSize) &&
      isBoardWon(gameBoards[4], playerType, gridSize) &&
      isBoardWon(gameBoards[8], playerType, gridSize)) ||
    (isBoardWon(gameBoards[2], playerType, gridSize) &&
      isBoardWon(gameBoards[4], playerType, gridSize) &&
      isBoardWon(gameBoards[6], playerType, gridSize))
  );
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

export const getWinningMoveOnBoard = (
  gameState: GameBoardState,
  playerType: PlayerType,
  gridSize: number
): Array<number> | undefined => {
  const winningConfigs = getWinConfigs(gridSize);
  let winningMove: Array<number> = [];

  winningConfigs.forEach(config => {
    const [pos1, pos2, pos3] = config;
    const [x1, y1] = pos1;
    const [x2, y2] = pos2;
    const [x3, y3] = pos3;

    if (
      gameState[x1][y1] === playerType &&
      gameState[x1][y1] === gameState[x2][y2] &&
      !gameState[x3][y3] &&
      !winningMove.length
    ) {
      winningMove = pos3;
    }

    if (
      gameState[x1][y1] === playerType &&
      gameState[x1][y1] === gameState[x3][y3] &&
      !gameState[x2][y2] &&
      !winningMove.length
    ) {
      winningMove = pos2;
    }

    if (
      gameState[x2][y2] === playerType &&
      gameState[x2][y2] === gameState[x3][y3] &&
      !gameState[x1][y1] &&
      !winningMove.length
    ) {
      winningMove = pos1;
    }
  });

  return winningMove.length ? winningMove : undefined;
};

export const getOptimalMoveOnBoard = (
  gameState: GameBoardState,
  playerType: PlayerType,
  gridSize: number
): number[] => {
  const opponentPlayer: PlayerType = playerType === "X" ? "O" : "X";

  let optimalMove = getWinningMoveOnBoard(gameState, playerType, gridSize);

  if (!optimalMove) {
    optimalMove = getWinningMoveOnBoard(gameState, opponentPlayer, gridSize);
  }

  if (!optimalMove) {
    const emptyPos = getEmptyPositions(gameState, gridSize);

    const availablePos = emptyPos.length;

    optimalMove =
      availablePos > 1 ? emptyPos[getRandomInt(availablePos)] : emptyPos[0];
  }

  return optimalMove;
};

export const getWinningBoardIndices = (
  gameBoards: Array<GameBoardState>,
  playerType: PlayerType,
  gridSize: number
) => {
  const winningBoardIndices: number[] = [];

  const opponentPlayer: PlayerType = playerType === "X" ? "O" : "X";

  gameBoards.forEach((board, index) => {
    const availableMoveCount = getEmptyPositions(board, gridSize);

    if (
      !isBoardWon(board, playerType, gridSize) &&
      !isBoardWon(board, opponentPlayer, gridSize) &&
      availableMoveCount.length
    ) {
      const winningMove = getWinningMoveOnBoard(board, playerType, gridSize);

      if (winningMove) {
        winningBoardIndices.push(index);
      }
    }
  });

  return winningBoardIndices;
};

export const getGameWinningBoardIndices = (
  gameBoards: Array<GameBoardState>,
  playerType: PlayerType,
  gridSize: number
): number[] => {
  const gameWinningBoards: number[] = [];

  const winningConfigs = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6]
  ];

  winningConfigs.map(config => {
    const [pos1, pos2, pos3] = config;
    const b1 = gameBoards[pos1];
    const b2 = gameBoards[pos2];
    const b3 = gameBoards[pos3];

    const opponentPlayer: PlayerType = playerType === "X" ? "O" : "X";

    const isB1Won = !!isBoardWon(b1, playerType, gridSize);
    const isB2Won = !!isBoardWon(b2, playerType, gridSize);
    const isB3Won = !!isBoardWon(b3, playerType, gridSize);

    const movesOnB1 = getEmptyPositions(b1, gridSize);
    const movesOnB2 = getEmptyPositions(b2, gridSize);
    const movesOnB3 = getEmptyPositions(b3, gridSize);

    if (
      isB1Won &&
      isB2Won &&
      movesOnB3.length &&
      !isBoardWon(b3, opponentPlayer, gridSize)
    ) {
      gameWinningBoards.push(pos3);
    }

    if (
      isB2Won &&
      isB3Won &&
      movesOnB1.length &&
      !isBoardWon(b1, opponentPlayer, gridSize)
    ) {
      gameWinningBoards.push(pos1);
    }

    if (
      isB1Won &&
      isB3Won &&
      movesOnB2.length &&
      !isBoardWon(b2, opponentPlayer, gridSize)
    ) {
      gameWinningBoards.push(pos2);
    }

    return config;
  });

  return gameWinningBoards;
};

export const getPlayableBoardIndices = (
  gameBoards: Array<GameBoardState>,
  playerType: PlayerType,
  gridSize: number
): number[] => {
  const playableBoardIndices: number[] = [];

  gameBoards.forEach((board, index) => {
    const opponentPlayer = playerType === "X" ? "O" : "X";

    const availableMoveCount = getEmptyPositions(board, gridSize);

    if (
      !isBoardWon(board, playerType, gridSize) &&
      !isBoardWon(board, opponentPlayer, gridSize) &&
      availableMoveCount.length
    ) {
      playableBoardIndices.push(index);
    }
  });

  return playableBoardIndices;
};

/**
 * Returns the coordinates of next move to make on a board
 * @param gameBoards
 * @param playerType
 */
export const getNextMove = (
  gameBoards: Array<GameBoardState>,
  playerType: PlayerType,
  gridSize: number,
  numberOfBoards?: number
): { [key: number]: number[] } | undefined => {
  const opponentPlayer = playerType === "X" ? "O" : "X";

  const gameWinningBoards = getGameWinningBoardIndices(
    gameBoards,
    playerType,
    gridSize
  );

  let indexOfBoardToPlay: number | undefined;

  if (gameWinningBoards.length) {
    indexOfBoardToPlay =
      gameWinningBoards.length > 1
        ? gameWinningBoards[getRandomInt(gameWinningBoards.length)]
        : gameWinningBoards[0];
  }

  /**
   * Check if opponent has a winning move and play it
   */

  if (indexOfBoardToPlay === undefined) {
    const opponentWinningBoards = getGameWinningBoardIndices(
      gameBoards,
      opponentPlayer,
      gridSize
    );

    if (opponentWinningBoards.length) {
      indexOfBoardToPlay =
        opponentWinningBoards.length > 1
          ? opponentWinningBoards[getRandomInt(opponentWinningBoards.length)]
          : opponentWinningBoards[0];
    }

    if (indexOfBoardToPlay !== undefined) {
      const board = gameBoards[indexOfBoardToPlay];
      const winningMove = getWinningMoveOnBoard(
        board,
        opponentPlayer,
        gridSize
      );
      if (winningMove && winningMove.length) {
        return {
          [indexOfBoardToPlay]: winningMove
        };
      }
    }
  }

  if (indexOfBoardToPlay === undefined) {
    const winningBoards = getWinningBoardIndices(
      gameBoards,
      playerType,
      gridSize
    );

    if (winningBoards.length) {
      indexOfBoardToPlay =
        winningBoards.length > 1
          ? winningBoards[getRandomInt(winningBoards.length)]
          : winningBoards[0];
    }
  }

  if (indexOfBoardToPlay === undefined) {
    const playableBoardIndices = getPlayableBoardIndices(
      gameBoards,
      playerType,
      gridSize
    );

    if (playableBoardIndices.length) {
      indexOfBoardToPlay =
        playableBoardIndices.length > 1
          ? playableBoardIndices[getRandomInt(playableBoardIndices.length)]
          : playableBoardIndices[0];
    }
  }

  const boardToPlay =
    indexOfBoardToPlay !== undefined
      ? gameBoards[indexOfBoardToPlay]
      : undefined;

  if (boardToPlay && indexOfBoardToPlay !== undefined) {
    const move = getOptimalMoveOnBoard(boardToPlay, playerType, gridSize);
    if (move) {
      const boardWithMove = { [indexOfBoardToPlay]: move };
      return boardWithMove;
    }
  }

  return undefined;
};
