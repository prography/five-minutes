import styled from 'styled-components';
import { ShadowBox } from '../../styles/common';

export const Question = styled(ShadowBox)`
  margin-top: 1.5rem;
`;
export const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
export const Footer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  margin: 1rem 0;
`;
export const Subject = styled.h3`
  flex: 1 1;
`;
export const Info = styled.div`
  flex: 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const Date = styled.span`
  font-size: 0.85em;
  color: ${props => props.theme.colors.gray};
`;
