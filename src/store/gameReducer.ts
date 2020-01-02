import React from 'react';
import { ActionTypes } from './actionTypes';

export interface IState {
  playerType: 'X' | 'O' | undefined;
  winTimes: number;
  numOfGames: number;
}

export const initialState: IState = {
  numOfGames: 0,
  playerType: undefined,
  winTimes: 0
};

interface IAction {
  type: ActionTypes;
  payload: any;
}

const reducer: React.Reducer<IState, IAction> = (state: IState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.SET_PLAYER_TYPE:
      return { ...state, playerType: payload };

    case ActionTypes.INCREMENT_SCORE:
      return {
        ...state,
        winTimes: state.winTimes + 1
      };

    case ActionTypes.INCREMENT_NUM_OF_GAMES:
      return {
        ...state,
        numOfGames: state.numOfGames + 1
      };

    default:
      return state;
  }
};

export default reducer;
