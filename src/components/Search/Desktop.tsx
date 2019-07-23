import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase, { InputBaseProps } from '@material-ui/core/InputBase';
import { MdSearch } from 'react-icons/md';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      fontSize: '1rem',
      alignItems: 'center',
      boxSizing: 'border-box',
      boxShadow: '0 0 0 0',
    },
    input: {
      fontSize: 'inherit',
      borderRadius: 5,
      padding: '0.25rem 0.75rem',
      paddingLeft: 35,
      width: '100%',
      transition: 'background-color 0.1s ease-in-out',
    },
    focusedinput: {
      backgroundColor: theme.palette.grey[200],
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      width: 1,
      height: 28,
      margin: 4,
    },
    form: {
      width: '100%',
      position: 'relative',
    },
    icon: {
      position: 'absolute',
      top: '50%',
      left: 5,
      transform: 'translateY(-55%)',
      color: theme.palette.grey[500],
      zIndex: 2,
    },
  }),
);
type IDesktopSearchProps = InputBaseProps & {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
const DesktopSearch: React.SFC<IDesktopSearchProps> = ({
  handleSubmit,
  ...props
}) => {
  const classes = useStyles();
  const [focused, setFocused] = useState(false);
  return (
    <Paper
      className={classes.root}
      elevation={focused ? 4 : 1}
      square
    >
      <form className={classes.form} onSubmit={handleSubmit}>
        <MdSearch size={20} className={classes.icon} />
        <InputBase
          fullWidth
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`${classes.input} ${focused && classes.focusedinput}`}
          placeholder="질문을 검색해주세요."
          {...props}
        />
      </form>
    </Paper>
  );
};

export default DesktopSearch;
