import React, { useState, useCallback, useEffect } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import InputBase, { InputBaseProps } from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { history, questionQueryHelper } from '../utils/history';
import { RouteComponentProps, withRouter } from 'react-router';

const useStyles = makeStyles(
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box',
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
    form: {
      width: '100%',
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
      elevation={focused ? 10 : 1}
      square
      {...paperProps}
    >
      <SearchIcon />
      <form className={classes.form} onSubmit={handleSearch}>
        <InputBase
          fullWidth
          value={search}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={classes.input}
          placeholder="질문을 검색해주세요."
          {...inputProps}
        />
      </form>
    </Paper>
  );
};

export default withRouter(Search);
