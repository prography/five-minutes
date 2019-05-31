import styled from 'styled-components';

export const WatchedWrapper = styled.div<{ active?: boolean }>`
  filter: ${props => props.active && 'grayscale(50%)'};
`;
