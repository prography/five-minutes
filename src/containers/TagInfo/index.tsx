import React, { SFC, useCallback, useMemo } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { TiTick } from 'react-icons/ti';
import { ITag } from '../../models/tag';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '../../reducers';
import { addTag } from '../../api/user';
import { setUserProfile } from '../../actions/auth';
import { notifier } from '../../utils/renoti';
import { useApi } from '../../hooks';

interface ITagInfoProps extends Partial<ITag> {
  name: string;
  count: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3, 3),
      marginBottom: theme.spacing(2),
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
    },
  }),
);

const TagInfo: SFC<ITagInfoProps> = ({ name, count }) => {
  const classes = useStyles();

  const isLoggedIn = useSelector(
    (state: IRootState) => state.auth.me.isLoggedIn,
  );
  const userId = useSelector((state: IRootState) => state.auth.me.user.id);
  const userTags = useSelector((state: IRootState) => state.auth.me.user.tags);
  const hasTag = useMemo(() => userTags.some(tag => tag.name === name), [userTags, name]);
  const dispatch = useDispatch();
  const { api, status } = useApi(addTag);
  const handleTag = useCallback(async () => {
    try {
      const {
        result: { user },
      } = await api(userId, name);
      dispatch(setUserProfile(user));
      notifier.notify({
        type: 'success',
        message: '관심 태그에 추가되었습니다!',
      });
    } catch (err) {
      notifier.notify({
        type: 'error',
        message: '태그 등록에 실패하였습니다.',
      });
    }
  }, [name, userId, dispatch, api]);
  return (
    <Paper className={classes.root}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs={12} container spacing={2}>
          <Grid item xs={12} sm={8}>
            <Typography variant="h2">{name}</Typography>
          </Grid>
          <Grid
            item
            sm={4}
            xs={12}
            container
            direction="column"
            justify="center"
            spacing={2}
          >
            {count && (
              <Grid item>
                <Typography>질문 수 : {count}</Typography>
              </Grid>
            )}
            {isLoggedIn && (
              <Grid item>
                {
                  hasTag ? <Chip color="secondary" avatar={<Avatar><TiTick /></Avatar>} label="내 관심태그" />
                    : (
                      <Button
                        color="secondary"
                        variant="contained"
                        disabled={status === 'FETCHING'}
                        onClick={handleTag}
                      >
                        {'내 관심태그에 추가'}
                      </Button>
                    )
                }
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TagInfo;
