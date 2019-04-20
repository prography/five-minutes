import React, { memo } from 'react';
import styled from 'styled-components';
import { ShadowBox } from '../../styles/common';

const Wrapper = styled.div`
  margin-top: 30px;
`;
const Title = styled.h1`
  font-size: 1.2rem;
`;
const SubTitle = styled.h2`
  color: #ccc;
  font-size: 1rem;
`;
const Content = styled.div`
  margin-top: 1rem;
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
