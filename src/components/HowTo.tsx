import React from "react";
import styled from "styled-components";
import Button from "./Button";

const HowToContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;

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
`;

const HowTo: React.FC = () => (
  <HowToContainer>
    <h1 className="game-title">Legendary Tic Tac Toe</h1>
    <div>
      <h3 className="subtitle">How to Play</h3>
      <ul>
        <li>There are 9 mini game boards.</li>
        <li>
          On any turn, you can play on any board (until that board is won).
        </li>
        <li>
          To win the game, you need to win 3 mini boards horizontally, vertially
          or along the diagonal.
        </li>
      </ul>

      <div>
        <Button>Play Game</Button>
      </div>
    </div>
  </HowToContainer>
);

export default HowTo;
