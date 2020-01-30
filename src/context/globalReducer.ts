import { createContext } from 'react';
import { Reducer } from 'react';
import { ActionTypes } from './globalActions';
import { PlayerType, GameBoardState, GameplayState } from '../common/types';
import { getInitialGameState } from '../common/gameplayUtils';

export const BOARD_COUNT = 9;
export const GRID_SIZE = 3;

export interface State {
  botType: PlayerType;
  playerType: PlayerType;
  winCount: number;
  gameCount: number;
  boardCount: number;
  gridSize: number;
  gameState: Array<GameBoardState>;
  gameplayState: GameplayState;
}

export const InitialState: State = {
  botType: undefined,
  gameCount: 1,
  playerType: undefined,
  winCount: 0,
  boardCount: BOARD_COUNT,
  gridSize: GRID_SIZE,
  gameState: getInitialGameState(BOARD_COUNT, GRID_SIZE),
  gameplayState: GameplayState.NotStarted
};

export interface Action {
  type: ActionTypes;
  payload?: any;
}

export const GlobalStoreContext = createContext<{
  state: State;
  dispatch: (action: Action) => void;
}>({ state: InitialState, dispatch: () => {} });

export const globalReducer: Reducer<State, Action> = (state: State, action) => {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.SET_PLAYER_TYPE:
      return {
        ...state,
        playerType: payload,
        botType: payload === 'X' ? 'O' : 'X'
      };

    case ActionTypes.INCREMENT_WIN_COUNT:
      return {
        ...state,
        winCount: state.winCount + 1
      };

    case ActionTypes.INCREMENT_GAME_COUNT:
      return {
        ...state,
        gameCount: state.gameCount + 1
      };

    case ActionTypes.SET_GAME_STATE:
      const updatedGameState = [
        ...state.gameState.slice(0, payload.boardIndex),
        payload.boardState,
        ...state.gameState.slice(payload.boardIndex + 1)
      ];
      return {
        ...state,
        gameState: updatedGameState
      };

    case ActionTypes.RESET_GAME_STATE:
      return {
        ...state,
        gameState: getInitialGameState(BOARD_COUNT, GRID_SIZE),
        gameplayState: GameplayState.NotStarted
      };

    case ActionTypes.SET_GAMEPLAY_STATE:
      return { ...state, gameplayState: payload };

    default:
      return state;
  }
};
