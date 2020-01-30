import React from 'react';
import styled from 'styled-components';
import PlayArea from './PlayArea';
import HowTo from './HowTo';

const StyledGame = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;

  .game-controls {
    display: flex;
    flex-basis: 100%;
    justify-content: center;
  }

  .playarea {
    display: flex;
    flex-basis: 100%;
    justify-content: center;
    align-content: center;
  }

  @media screen and (min-width: 1260px) {
    .game-controls {
      flex: 1;
    }

    .playarea {
      flex: 1;
    }
  }
`;

const Game: React.FC = () => (
  <StyledGame>
    <div className='game-controls'>
      <HowTo />
    </div>
    <div className='playarea'>
      <PlayArea />
    </div>
  </StyledGame>
);

export default Game;
