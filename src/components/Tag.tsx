import React, { memo } from 'react';
import { CustomLink } from '.';
import { ITag } from '../models/tag';
import Chip, { ChipProps } from '@material-ui/core/Chip';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chip: {
      margin: theme.spacing(0.5),
      marginLeft: 0,
    },
  }),
);

const Tag: React.SFC<Pick<ITag, 'name'> & ChipProps> = ({ name, ...props }) => {
  const classes = useStyles();
  const withoutLink = props.onClick || props.onDelete;
  const TagChip = (
    <Chip
      className={classes.chip}
      color="secondary"
      clickable
      label={name}
      {...props}
    />
  );
  return (
    <>
      {withoutLink ? (
        TagChip
      ) : (
        <CustomLink to={`/tagged/${name}`}>{TagChip}</CustomLink>
      )}
    </>
  );
};

export default memo(Tag);
