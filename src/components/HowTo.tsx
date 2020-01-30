import React, { useContext } from 'react';
import styled from 'styled-components';
import Button from './Button';
import ScoreCard from './ScoreCard';
import { GlobalStoreContext } from '../context/globalReducer';
import { incrementGameCount, resetGameState } from '../context/globalActions';
import { GameplayState, GameplayStateText } from '../common/types';

const HowToContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  min-height: 500px;
  justify-content: space-evenly;

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
    align-items: flex-end;
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
          Game Over ! {GameplayStateText[gameplayState]}
        </div>
        <Button onClick={startNewGame}>New Game</Button>
      </>
    );
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
      <div className='game-control'>
        <div className='gameplay-state'>{renderGameEndState()}</div>
        <div className='score-card'>
          <ScoreCard score={appState.winTimes} label='Won' />
          <ScoreCard score={appState.numOfGames} label='Games' />
        </div>
      </div>
    </HowToContainer>
  );
};

export default HowTo;
