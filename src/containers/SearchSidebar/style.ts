import styled from 'styled-components';

export const WatchedWrapper = styled.div<{ active?: boolean }>`
  opacity: ${props => (props.active ? 1 : 0.4)};
`;
