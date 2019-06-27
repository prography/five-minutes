import React, { useState, useCallback, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import InputBase, { InputBaseProps } from '@material-ui/core/InputBase';
import { MdSearch } from 'react-icons/md';
import { history, questionQueryHelper } from '../utils/history';
import { RouteComponentProps, withRouter } from 'react-router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      alignItems: 'center',
      boxSizing: 'border-box',
      boxShadow: '0 0 0 0',
    },
    input: {
      borderRadius: 5,
      padding: '5px 10px',
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
      top: 8,
      left: 5,
      color: theme.palette.grey[500],
    },
  }),
);

interface IInputProps extends RouteComponentProps {
  paperProps?: PaperProps;
  inputProps?: InputBaseProps;
}
const Search: React.SFC<IInputProps> = ({
  location,
  paperProps = {},
  inputProps = {},
}) => {
  const classes = useStyles();
  const [focused, setFocused] = useState(false);
  const [search, setSearch] = useState(
    questionQueryHelper.searchQuery.subject || '',
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
    [],
  );
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    history.push(
      `/search?${questionQueryHelper.makeQuery({ subject: search })}`,
    );
  };

  useEffect(() => {
    setSearch(questionQueryHelper.searchQuery.subject || '');
  }, [location.search]);

  return (
    <Paper
      className={classes.root}
      elevation={focused ? 4 : 1}
      square
      {...paperProps}
    >
      <form className={classes.form} onSubmit={handleSearch}>
        <MdSearch size={25} className={classes.icon} />
        <InputBase
          fullWidth
          value={search}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`${classes.input} ${focused && classes.focusedinput}`}
          placeholder="질문을 검색해주세요."
          {...inputProps}
        />
      </form>
    </Paper>
  );
};

export default withRouter(Search);
