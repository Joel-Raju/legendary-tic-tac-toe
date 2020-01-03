/**
 * If won returns the winning row / col / diagoal indices or else undefined
 * @param gameState Game State of a board
 * @returns
 */

export const isBoardWon = (
  gameState: Array<Array<number>>
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
    gameState[1][1] === gameState[2][1]
  ) {
    return [
      [0, 2],
      [1, 1],
      [2, 1]
    ];
  }

  return false;
};
