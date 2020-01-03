import React from 'react';
import { ActionTypes } from './actionTypes';
import { PlayerType } from '../common/types';

export interface State {
  playerType: PlayerType;
  winTimes: number;
  numOfGames: number;
}

export const InitialState: State = {
  numOfGames: 0,
  playerType: 'X',
  winTimes: 0
};

export interface Action {
  type: ActionTypes;
  payload?: any;
}

const reducer: React.Reducer<State, Action> = (state: State, action) => {
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
