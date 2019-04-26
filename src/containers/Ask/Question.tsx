import React, { memo } from 'react';
import styled from 'styled-components';
import { ShadowBox } from '../../styles/common';

const Wrapper = styled.div`
  margin-top: 16px;
`;
const Title = styled.h1`
  font-size: 20px;
  font-weight: 200;
  margin-top: 0px;
  margin-bottom: 5px;
`;
const SubTitle = styled.h2`
  color: #ccc;
  font-size: 13px;
  font-weight: 200;
  margin-bottom: 26px;
`;
const Content = styled.div`
  margin-top: 28px;
  font-weight: 200;

`;
interface IQuestionProps {
  title: string;
  subTitle?: string;
  children: React.ReactNode;
}
const Question: React.SFC<IQuestionProps> = ({ title, subTitle, children }) => {
  return (
    <Wrapper>
      <ShadowBox>
        <Title>{title}</Title>
        {subTitle && <SubTitle>{subTitle}</SubTitle>}
        <Content>{children}</Content>
      </ShadowBox>
    </Wrapper>
  );
};

export default memo(Question);
