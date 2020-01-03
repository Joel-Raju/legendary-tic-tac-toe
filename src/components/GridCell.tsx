import React from 'react';
import styled from 'styled-components';
import { PlayerType } from '../common/types';

enum CellType {
  EMPTY,
  PLAYER,
  BOT
}

const getBgColor = (type: CellType) => {
  if (type === CellType.PLAYER) {
    return `#ede0c8`;
  }

  if (type === CellType.BOT) {
    return `#f2b179`;
  }

  return `rgba(238, 228, 218, 0.35)`;
};

const StyledCell = styled.div<{ type: CellType }>`
  display: flex;
  background: ${props => getBgColor(props.type)};
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
    color: ${props => (props.type === CellType.BOT ? `#ffffff` : `#776e65`)};
  }
`;

interface Props {
  playerType: PlayerType;
  value?: PlayerType;
  onClick: () => any;
}

const GridCell: React.FC<Props> = ({ playerType, value, onClick }) => {
  const getCellType = () => {
    if (playerType && value) {
      if (playerType === value) {
        return CellType.PLAYER;
      }
      return CellType.BOT;
    }

    return CellType.EMPTY;
  };

  return (
    <StyledCell onClick={() => onClick()} type={getCellType()}>
      <div className='inner-value'>{value}</div>
    </StyledCell>
  );
};

export default GridCell;
