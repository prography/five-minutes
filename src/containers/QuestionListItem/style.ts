import styled from 'styled-components';
import { ShadowBox } from '../../styles/common';

export const Question = styled(ShadowBox)`
  cursor: pointer;
  margin-bottom: 1rem;
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
export const FooterRight = styled.div`
  text-align: right;
`;
export const TagContainer = styled.div`
  flex: 1 1;
`;
export const CountContainer = styled.div`
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  font-size: 0.92em;
  color: ${props => props.theme.palette.darkGray};
`;
export const Count = styled.div`
  display: flex;
  margin-left: 10px;
  align-items: center;
`;
export const Profile = styled.div``;
export const Subject = styled.h3`
  flex: 1 1;
`;
export const Info = styled.div`
  font-size: 0.85em;
  color: ${props => props.theme.palette.darkGray};
`;
