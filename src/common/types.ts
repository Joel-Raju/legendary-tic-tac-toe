export type PlayerType = 'X' | 'O' | undefined;

export type GameBoardState = Array<Array<PlayerType>>;

export enum GameplayState {
  NotStarted,
  Started,
  PlayerWon,
  PlayerLoose,
  Draw
}

export const GameplayStateText = {
  [GameplayState.NotStarted]: 'Not Started',
  [GameplayState.Started]: 'Started',
  [GameplayState.PlayerWon]: 'You win',
  [GameplayState.PlayerLoose]: 'You loose',
  [GameplayState.Draw]: 'Draw'
};
