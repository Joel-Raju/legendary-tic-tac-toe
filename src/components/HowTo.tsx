import React, { useContext } from 'react';
import styled from 'styled-components';
import Button from './Button';
import ScoreCard from './ScoreCard';
import { GlobalStoreContext } from '../context/globalReducer';
import {
  incrementGameCount,
  resetGameState,
  setPlayerType
} from '../context/globalActions';
import { GameplayState, GameplayStateText, PlayerType } from '../common/types';
import GridCell from './GridCell';

const HowToContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  min-height: 500px;
  justify-content: space-evenly;
  width: 100%;

  .game-title {
    font-size: 4rem;
    color: #776e65;
    text-align: left;
  }

  .subtitle {
    font-size: 2rem;
    color: #776e65;
    text-align: left;
  }

  ul {
    font-size: 1.2rem;
    color: #776e65;
    text-align: left;
  }

  .score-card {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  .game-control {
    display: flex;
    flex: 1;
    align-items: center;
    width: 100%;
  }

  .gameplay-state {
    display: flex;
    flex: 2;
    flex-direction: column;
    font-size: 2rem;
    color: #776e65;
    justify-content: center;
    align-items: center;
  }

  .game-over {
    margin-top: 8px;
    margin-bottom: 8px;
  }

  .player-picker {
    font-size: 1.25rem;
    font-weight: bold;
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;

    .player-wrapper {
      margin: 8px;
    }
  }

  @media screen and (max-width: 1260px) {
    .game-control {
      width: 60%;
    }
  }
`;

const HowTo: React.FC = () => {
  const { state: appState, dispatch: dispatchToGlobal } = useContext(
    GlobalStoreContext
  );

  const startNewGame = () => {
    dispatchToGlobal(incrementGameCount());
    dispatchToGlobal(resetGameState());
  };

  const renderGameEndState = () => {
    const { gameplayState } = appState;

    if (gameplayState === GameplayState.NotStarted) {
      return null;
    }

    if (gameplayState === GameplayState.Started) {
      return <Button onClick={startNewGame}>New Game</Button>;
    }

    return (
      <>
        <div className='game-over'>
          Game Over! {GameplayStateText[gameplayState]}
        </div>
        <Button onClick={startNewGame}>New Game</Button>
      </>
    );
  };

  const onChoosePlayer = (player: PlayerType) => {
    dispatchToGlobal(setPlayerType(player));
  };

  return (
    <HowToContainer>
      <h1 className='game-title'>Legendary Tic Tac Toe</h1>
      <div>
        <h3 className='subtitle'>How to Play</h3>
        <ul>
          <li>There are 9 mini game boards.</li>
          <li>
            On any turn, you can play on any board (until that board is won).
          </li>
          <li>
            To win the game, you need to win 3 mini boards horizontally,
            vertially or along the diagonal.
          </li>
        </ul>
      </div>
      {!appState.playerType || !appState.botType ? (
        <div className='player-picker'>
          Choose your player:
          <div className='player-wrapper'>
            <GridCell
              playerType='X'
              value='X'
              onClick={() => onChoosePlayer('X')}
            />
          </div>
          <div className='player-wrapper'>
            <GridCell
              playerType='O'
              value='O'
              onClick={() => onChoosePlayer('O')}
            />
          </div>
        </div>
      ) : (
        <div className='game-control'>
          <div className='gameplay-state'>{renderGameEndState()}</div>
          <div className='score-card'>
            <ScoreCard score={appState.winCount} label='Won' />
            <ScoreCard score={appState.gameCount} label='Games' />
          </div>
        </div>
      )}
    </HowToContainer>
  );
};

export default HowTo;
