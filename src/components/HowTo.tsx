import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const HowToContainer = styled.div``;

const HowTo: React.FC = () => (
  <HowToContainer>
    <h1>Legendary Tic Tac Toe Game</h1>
    <h3>How to Play</h3>
    <ul>There are 9 mini game boards.</ul>
    <ul>On any turn, you can play on any board (until that board is won).</ul>
    <ul>
      To win the game, you need to win 3 mini boards horizontally, vertially or
      along the diagonal.
    </ul>

    <Button>Play Game</Button>
  </HowToContainer>
);

export default HowTo;
