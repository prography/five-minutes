import React, { memo } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { ProfileLink, ProfilePhoto } from '../components';
import { IUser } from '../models/user';

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 250,
      padding: `${theme.spacing(1)}px`,
      boxShadow: '0 0 0 0',
      marginLeft: 'auto',
      marginRight: 0,
      backgroundColor: theme.palette.grey[100],
    },
    left: {
    },
    right: {
      flex: 1,
      marginLeft: 10,
    },
    info: {
      color: theme.palette.grey[500],
      fontSize: '0.8rem',
    }
  }),
);

type ProfileBoxProps = Pick<IUser, 'id' | 'nickname' | 'image'> & { activeTime?: string };

const ProfileBox: React.SFC<ProfileBoxProps> = ({ id, nickname, image, activeTime = '' }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Grid container>
        <Grid item className={classes.left}>
          <ProfilePhoto src={image} userId={id} />
        </Grid>
        <Grid item className={classes.right} container direction="column">
          <Grid item>
            <ProfileLink id={id}>{nickname}</ProfileLink>
          </Grid>
          <Grid item className={classes.info}>
            {activeTime}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default memo(ProfileBox);
