import React from "react";
import { ActionTypes } from "./actionTypes";
import { PlayerType } from "../common/types";

const BOARD_COUNT = 9;
const GRID_SIZE = 3;

export interface State {
  botType: PlayerType;
  playerType: PlayerType;
  winTimes: number;
  numOfGames: number;
  boardCount: number;
  gridSize: number;
}

export const InitialState: State = {
  botType: "O",
  numOfGames: 0,
  playerType: "X",
  winTimes: 0,
  boardCount: BOARD_COUNT,
  gridSize: GRID_SIZE
};

export interface Action {
  type: ActionTypes;
  payload?: any;
}

const reducer: React.Reducer<State, Action> = (state: State, action) => {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.SET_PLAYER_TYPE:
      return {
        ...state,
        playerType: payload,
        botType: payload === "X" ? "O" : "X"
      };

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
