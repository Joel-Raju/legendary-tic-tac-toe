import {
  getWinConfigs,
  isBoardWon,
  getEmptyPositions,
  isGameWon,
  getInitialGameState,
  getWinningMoveOnBoard,
  getOptimalMoveOnBoard,
  getWinningBoardIndices,
  getGameWinningBoardIndices
} from "../gameplayUtils";
import { PlayerType, GameBoardState } from "../types";

describe("gameplayUtils", () => {
  it("gets Win Configs", () => {
    expect(getWinConfigs(3)).toEqual([
      [
        [0, 0],
        [0, 1],
        [0, 2]
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0]
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2]
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1]
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2]
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2]
      ],
      [
        [0, 0],
        [1, 1],
        [2, 2]
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0]
      ]
    ]);
  });

  it("checks is Board Won", () => {
    const valsArr = new Array(3).fill(undefined);
    const emptyArray = [valsArr, valsArr, valsArr];

    expect(isBoardWon(emptyArray, "X", 3)).toEqual(undefined);
    expect(
      isBoardWon(
        [
          ["O", "X", "X"],
          ["X", "O", "O"],
          ["X", "X", "O"]
        ],
        "O",
        3
      )
    ).toEqual([
      [0, 0],
      [1, 1],
      [2, 2]
    ]);
    expect(
      isBoardWon(
        [
          ["X", "X", "O"],
          ["O", "O", "X"],
          ["X", "O", "X"]
        ],
        "X",
        3
      )
    ).toEqual(undefined);
  });

  it("gets empty board positions", () => {
    expect(
      getEmptyPositions(
        [
          ["O", "X", "X"],
          ["X", "O", "O"],
          ["X", "X", "O"]
        ],
        3
      )
    ).toEqual([]);

    expect(
      getEmptyPositions(
        [
          ["O", "X", undefined],
          ["X", undefined, "O"],
          ["X", "X", "O"]
        ],
        3
      )
    ).toEqual([
      [0, 2],
      [1, 1]
    ]);
  });

  it("checks if game is won", () => {
    const gameWonBoard: GameBoardState = [
      ["O", "X", "X"],
      ["X", "O", "O"],
      ["X", "X", "O"]
    ];

    const gameLoseBoard: GameBoardState = [
      ["O", "X", "X"],
      ["X", "O", "O"],
      ["X", "O", "X"]
    ];

    const gameWonConfig: GameBoardState[] = [
      gameWonBoard,
      gameWonBoard,
      gameWonBoard,
      gameLoseBoard,
      gameLoseBoard,
      gameLoseBoard,
      gameLoseBoard,
      gameLoseBoard,
      gameLoseBoard
    ];

    const gameLoseConfig: GameBoardState[] = [
      gameWonBoard,
      gameLoseBoard,
      gameLoseBoard,
      gameWonBoard,
      gameWonBoard,
      gameLoseBoard,
      gameLoseBoard,
      gameLoseBoard,
      gameLoseBoard
    ];

    expect(isGameWon(gameWonConfig, "O", 3)).toEqual([0, 1, 2]);

    expect(isGameWon(gameLoseConfig, "O", 3)).toEqual(false);
  });

  it("gets initial game state", () => {
    const boardCount = 9;
    const gridSize = 3;

    const boardRow = new Array(gridSize).fill(undefined);
    const board = [boardRow, boardRow, boardRow];

    const gameState = new Array(boardCount).fill(board);

    expect(getInitialGameState(boardCount, gridSize)).toEqual(gameState);
  });

  it("get winning move On Board", () => {
    const winPossibleBoard: GameBoardState = [
      ["O", "X", undefined],
      ["O", undefined, "X"],
      ["X", "X", "O"]
    ];

    const winImpossibleBoard: GameBoardState = [
      ["O", "X", undefined],
      ["O", undefined, "X"],
      ["X", "O", "X"]
    ];

    const playerType: PlayerType = "O";
    const gridSize = 3;

    expect(
      getWinningMoveOnBoard(winPossibleBoard, playerType, gridSize)
    ).toEqual([1, 1]);

    expect(
      getWinningMoveOnBoard(winImpossibleBoard, playerType, gridSize)
    ).toEqual(undefined);
  });

  it("get optimal move on board", () => {
    const winPossibleBoard: GameBoardState = [
      ["O", "X", undefined],
      ["O", undefined, "X"],
      ["X", "X", "O"]
    ];

    const playerType: PlayerType = "O";
    const gridSize = 3;

    const opponentWinBoard: GameBoardState = [
      ["X", "X", "O"],
      ["O", undefined, undefined],
      ["X", "O", "X"]
    ];

    expect(
      getOptimalMoveOnBoard(winPossibleBoard, playerType, gridSize)
    ).toEqual([1, 1]);

    expect(
      getOptimalMoveOnBoard(opponentWinBoard, playerType, gridSize)
    ).toEqual([1, 1]);
  });

  it("get winning board indices", () => {
    const gameWonBoard: GameBoardState = [
      ["O", "X", "X"],
      ["X", "O", "O"],
      ["X", "X", "O"]
    ];

    const winPossibleBoard: GameBoardState = [
      ["O", "X", undefined],
      ["O", undefined, "X"],
      ["X", "X", "O"]
    ];

    const gameLoseBoard: GameBoardState = [
      ["O", "X", "X"],
      ["X", "O", "O"],
      ["X", "O", "X"]
    ];

    const gameState: GameBoardState[] = [
      gameWonBoard,
      winPossibleBoard,
      gameWonBoard,
      gameLoseBoard,
      gameLoseBoard,
      gameLoseBoard,
      gameLoseBoard,
      gameLoseBoard,
      winPossibleBoard
    ];

    expect(getWinningBoardIndices(gameState, "O", 3)).toEqual([1, 8]);
  });

  it("get game winning board indices", () => {
    const gameWonBoard: GameBoardState = [
      ["O", "X", "X"],
      ["X", "O", "O"],
      ["X", "X", "O"]
    ];

    const winPossibleBoard: GameBoardState = [
      ["O", "X", undefined],
      ["O", undefined, "X"],
      ["X", "X", "O"]
    ];

    const gameLoseBoard: GameBoardState = [
      ["O", "X", "X"],
      ["X", "O", "O"],
      ["X", "O", "X"]
    ];

    const gameState: GameBoardState[] = [
      gameWonBoard,
      winPossibleBoard,
      gameWonBoard,
      gameLoseBoard,
      gameLoseBoard,
      gameLoseBoard,
      gameLoseBoard,
      gameWonBoard,
      gameLoseBoard
    ];

    expect(getGameWinningBoardIndices(gameState, "O", 3)).toEqual([1]);
  });

  it("get playable board indices", () => {});
});
