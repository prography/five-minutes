import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import TextField, { StandardTextFieldProps } from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { MdSearch } from 'react-icons/md';

const FixedContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 999; 
`
const InnerContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  top: 40%;
  width: 100%;
  max-width: 800px;
  margin: auto;
  padding: 0 10px;
`

const Form = styled.form`
  width: 100%;
  margin-bottom: 5px;
  input {
    font-size: 125%;
  }
`;

const FloatedButton = styled(Button)`
  float: right;
`
const Icon = styled(MdSearch)`
  color: ${props => props.theme.palette.darkGray};
  cursor: pointer;
  &:hover {
    color: black;
    transition: color 0.1s;
  }
`

interface IMobileSearchProps extends StandardTextFieldProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const MobileSearch: React.SFC<IMobileSearchProps> = ({ handleSubmit, ...props }) => {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => {
    setOpen(false);
  }, []);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.persist();
    setOpen(false);
    handleSubmit(e);
  }
  return (
    <>
      <Icon role="button" size={24} onClick={() => setOpen(true)} />
      {
        open && (
          <FixedContainer>
            <InnerContainer>
              <Form onSubmit={onSubmit}>
                <TextField autoFocus placeholder="질문을 검색해주세요." fullWidth {...props} />
              </Form>
              <FloatedButton onClick={close} variant="outlined">닫기</FloatedButton>
            </InnerContainer>
          </FixedContainer>
        )
      }

    </>
  )
}

export default MobileSearch;