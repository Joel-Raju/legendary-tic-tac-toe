import React from 'react';
import styled from 'styled-components';

const StyledCell = styled.div`
  display: flex;
  background: rgba(238, 228, 218, 0.35);
  border-radius: 3px;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    width: 50px;
    height: 50px;
  }

  .inner-value {
    flex: 1;
    font-size: 2rem;
    text-align: center;
  }
`;

interface Props {
  type: 'empty' | 'player' | 'opponent';
  value?: 'X' | 'O';
  onClick: () => any;
}

const GridCell: React.FC<Props> = ({ type, value, onClick }) => (
  <StyledCell onClick={() => onClick()}>
    <div className='inner-value'>{value}</div>
  </StyledCell>
);

export default GridCell;
