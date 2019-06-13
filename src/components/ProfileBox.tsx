import React, { memo } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { ProfileLink, ProfilePhoto } from '../components';
import { IUser } from '../models/user';

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '15rem',
      padding: theme.spacing(1),
      boxShadow: '0 0 0 0'
    },
    left: {
      flex: '1 0',
      textAlign: 'right',
    },
    right: {
      minWidth: 80,
      textAlign: 'center',
    },
  }),
);

type ProfileBoxProps = Pick<IUser, 'id' | 'nickname' | 'image'>;

const ProfileBox: React.SFC<ProfileBoxProps> = ({ id, nickname, image }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Grid container justify="flex-end" alignItems="center">
        <Grid item className={classes.left} container direction="column">
          <div>
            <ProfileLink id={id}>{nickname}</ProfileLink>
          </div>
        </Grid>
        <Grid item className={classes.right}>
          <ProfilePhoto src={image} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default memo(ProfileBox);
