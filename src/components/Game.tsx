import React from "react";
import styled from "styled-components";
import PlayArea from "./PlayArea";
import HowTo from "./HowTo";

const StyledGame = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;

  .game-controls {
    display: flex;
    flex: 1;
    justify-content: center;
  }

  .playarea {
    display: flex;
    flex: 1;
    justify-content: center;
  }
`;

const Game: React.FC = () => (
  <StyledGame>
    <div className="game-controls">
      <HowTo />
    </div>
    <div className="playarea">
      <PlayArea />
    </div>
  </StyledGame>
);

export default Game;
