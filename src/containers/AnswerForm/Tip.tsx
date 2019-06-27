import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TIPS from './Tips';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: 380,
      padding: theme.spacing(2),
    },
  }),
);
type TipType = 'markdown' | 'writing';
const Tip = () => {
  const classes = useStyles();
  const [tipEl, setTipEl] = useState<HTMLButtonElement | null>(null);
  const [type, setType] = useState<TipType | ''>('');
  const handleClick = (type: TipType) => (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setTipEl(e.currentTarget);
    setType(prev => (prev === type ? '' : type));
  };
  const handleClose = (e: React.MouseEvent<EventTarget>) => {
    if (!tipEl || !tipEl.contains(e.target as HTMLElement)) {
      setType('');
    }
  };
  const open = !!type;
  return (
    <div>
      <Button color="primary" onClick={handleClick('writing')}>작성 팁</Button>
      <Button color="primary" onClick={handleClick('markdown')}>마크다운 사용법</Button>
      <Popper open={open} anchorEl={tipEl}>
        <Paper className={classes.paper}>
          {type && (
            <ClickAwayListener onClickAway={handleClose}>
              <div>{TIPS[type]()}</div>
            </ClickAwayListener>
          )}
        </Paper>
      </Popper>
    </div>
  );
};

export default Tip;
