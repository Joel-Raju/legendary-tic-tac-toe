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
  playerType: PlayerType
): Array<Array<number>> | undefined => {
  if (
    playerType === gameState[0][0] &&
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
    playerType === gameState[1][0] &&
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
    playerType === gameState[2][0] &&
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
    playerType === gameState[0][0] &&
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
    playerType === gameState[0][1] &&
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
    playerType === gameState[0][2] &&
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
    playerType === gameState[0][0] &&
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
    playerType === gameState[0][2] &&
    gameState[0][2] === gameState[1][1] &&
    gameState[1][1] === gameState[2][0]
  ) {
    return [
      [0, 2],
      [1, 1],
      [2, 0]
    ];
  }

  return undefined;
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

export const getNonStaleMoveOnBoard = (
  gamestate: GameBoardState,
  playerType: PlayerType,
  gridSize: number
): number[] | undefined => {
  let isMoveLeft = false;

  for (let x = 0; x < gridSize; x += 1) {
    for (let y = 0; y < gridSize; y += 1) {
      if (!!gamestate[x][y] && !isMoveLeft) {
        isMoveLeft = true;
      }
    }
  }
  return [];
};

export const getWinningBoardIndices = (
  gameBoards: Array<GameBoardState>,
  playerType: PlayerType,
  gridSize: number
) => {
  const winningBoardIndices: number[] = [];

  gameBoards.forEach((board, index) => {
    if (!isBoardWon(board, playerType)) {
      const winningMove = getWinningMove(board, playerType, gridSize);
      if (winningMove) {
        winningBoardIndices.push(index);
      }
    }
  });
  return winningBoardIndices;
};

export const getGameWinningBoardIndices = (
  gameBoards: Array<GameBoardState>,
  playerType: PlayerType
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

    const isB1Won = !!isBoardWon(b1, playerType);
    const isB2Won = !!isBoardWon(b2, playerType);
    const isB3Won = !!isBoardWon(b3, playerType);

    if (isB1Won && isB2Won && !!isBoardWon(b3, opponentPlayer)) {
      gameWinningBoards.push(pos3);
    }

    if (isB2Won && isB3Won && !!isBoardWon(b1, opponentPlayer)) {
      gameWinningBoards.push(pos1);
    }

    if (isB1Won && isB3Won && !!isBoardWon(b2, opponentPlayer)) {
      gameWinningBoards.push(pos2);
    }

    return config;
  });

  return gameWinningBoards;
};

export const getPlayableBoardIndices = (
  gameBoards: Array<GameBoardState>,
  playerType: PlayerType
): number[] => {
  return [];
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
  const gameWinningBoards = getGameWinningBoardIndices(gameBoards, playerType);
  let indexOfBoardToPlay: number | undefined;

  if (gameWinningBoards.length) {
    indexOfBoardToPlay =
      gameWinningBoards.length > 1
        ? getRandomInt(gameWinningBoards.length)
        : gameWinningBoards[0];
  }

  if (!indexOfBoardToPlay) {
    const winningBoards = getWinningBoardIndices(
      gameBoards,
      playerType,
      gridSize
    );

    if (winningBoards.length) {
      indexOfBoardToPlay =
        winningBoards.length > 1
          ? getRandomInt(winningBoards.length)
          : winningBoards[0];
    }
  }

  if (!indexOfBoardToPlay) {
    const playableBoardIndices = getPlayableBoardIndices(
      gameBoards,
      playerType
    );
    if (playableBoardIndices.length) {
      indexOfBoardToPlay =
        playableBoardIndices.length > 1
          ? getRandomInt(playableBoardIndices.length)
          : playableBoardIndices[0];
    }
  }

  const boardToPlay =
    indexOfBoardToPlay !== undefined
      ? gameBoards[indexOfBoardToPlay]
      : undefined;

  if (boardToPlay && indexOfBoardToPlay !== undefined) {
    const move = getNonStaleMoveOnBoard(boardToPlay, playerType, gridSize);
    if (move) {
      const boardWithMove = { indexOfBoardToPlay: move };
      return boardWithMove;
    }
  }

  return undefined;
};
