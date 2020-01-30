import React from 'react';
import styled from 'styled-components';

interface Props {
  score: number;
  label: string;
}

const StyledScoreCard = styled.div`
  background: #bbada0;
  width: 60px;
  height: 60px;
  text-align: center;
  padding: 6px;
  border-radius: 3px;
  margin-left: 4px;
  margin-right: 4px;

  .label {
    color: #eee4da;
    font-size: 1rem;
    font-weight: bold;
  }

  .score {
    color: #ffffff;
    font-size: 2rem;
    font-weight: bold;
  }
`;

const ScoreCard: React.FC<Props> = ({ score, label }) => (
  <StyledScoreCard>
    <div className='label'>{label}</div>
    <div className='score'>{score}</div>
  </StyledScoreCard>
);

export default ScoreCard;
