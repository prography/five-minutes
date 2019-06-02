import React, { memo } from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { Divider } from '../../components';
import useMarkdown from '../../hooks/useMarkdown';

type EditorProps = TextFieldProps;
const Editor: React.SFC<EditorProps> = ({ value = '', variant, ...props }) => {
  const markdownValue = useMarkdown(`${value}`);
  return (
    <>
      <div>
        <TextField
          id="contents"
          multiline
          margin="dense"
          fullWidth
          value={value}
          variant={variant as any}
          {...props}
        />
      </div>
      <Divider withMargin />
      <div>
        <div dangerouslySetInnerHTML={{ __html: markdownValue }} />
      </div>
    </>
  );
};

export default memo(Editor);
