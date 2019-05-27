import React, { useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import InputBase, { InputBaseProps } from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
    },
    input: {
      marginLeft: 8,
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      width: 1,
      height: 28,
      margin: 4,
    },
  }),
);

interface IInputProps {
  paperProps?: PaperProps;
  inputProps?: InputBaseProps;
}
const Input: React.SFC<IInputProps> = ({
  paperProps = {},
  inputProps = {},
}) => {
  const classes = useStyles();
  const [focused, setFocused] = useState(false);
  return (
    <Paper
      className={classes.root}
      elevation={focused ? 10 : 1}
      square
      {...paperProps}
    >
      <SearchIcon />
      <InputBase
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={classes.input}
        placeholder="질문을 검색해주세요."
        {...inputProps}
      />
    </Paper>
  );
};

export default Input;
