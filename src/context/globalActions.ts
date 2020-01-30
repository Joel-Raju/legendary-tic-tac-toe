import { PlayerType, GameBoardState, GameplayState } from '../common/types';

export enum ActionTypes {
  SET_PLAYER_TYPE = 'SET_PLAYER_TYPE',
  INCREMENT_WIN_COUNT = 'INCREMENT_WIN_COUNT',
  INCREMENT_GAME_COUNT = 'INCREMENT_GAME_COUNT',
  SET_GAME_STATE = 'SET_GAME_STATE',
  RESET_GAME_STATE = 'RESET_GAME_STATE',
  SET_GAMEPLAY_STATE = 'SET_GAMEPLAY_STATE'
}

export const setPlayerType = (player: PlayerType) => ({
  type: ActionTypes.SET_PLAYER_TYPE,
  payload: player
});

export const incrementWinCount = () => ({
  type: ActionTypes.INCREMENT_WIN_COUNT
});

export const incrementGameCount = () => ({
  type: ActionTypes.INCREMENT_GAME_COUNT
});

export const setGameState = (
  boardIndex: number,
  boardState: GameBoardState
) => ({
  type: ActionTypes.SET_GAME_STATE,
  payload: { boardIndex, boardState }
});

export const resetGameState = () => ({
  type: ActionTypes.RESET_GAME_STATE
});

export const setGameplayState = (gameplayState: GameplayState) => ({
  type: ActionTypes.SET_GAMEPLAY_STATE,
  payload: gameplayState
});
