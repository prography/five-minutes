import React, { useState, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: 300,
      padding: theme.spacing(2),
    },
  }),
);

const Tip = () => {
  const classes = useStyles();
  const [tipEl, setTipEl] = useState<HTMLButtonElement | null>(null);
  const [type, setType] = useState('');
  const handleClick = (type: string) => (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setTipEl(e.currentTarget);
    setType(prev => (prev === type ? '' : type));
  };

  const open = !!type;

  const WritingTip = useCallback(
    () => (
      <>
        <h2>작성 팁</h2>
        <p>'/'을 활용하셈</p>
      </>
    ),
    [],
  );
  const MarkdownTip = useCallback(
    () => (
      <>
        <h2>마크다운 팁</h2>
        <h3>헤더</h3>
        <p>헤더는 '#'으로 표기합니다. '# Header 1' '## Header 2'</p>
      </>
    ),
    [],
  );
  return (
    <div>
      <Button onClick={handleClick('writing')}>작성 팁</Button>
      <Button onClick={handleClick('makrdown')}>마크다운 사용법</Button>
      <Popper open={open} anchorEl={tipEl}>
        <Paper className={classes.paper}>
          {type === 'writing' ? <WritingTip /> : <MarkdownTip />}
        </Paper>
      </Popper>
    </div>
  );
};

export default Tip;
