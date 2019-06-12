import React, { memo } from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { Divider } from '../../components';
import useMarkdown from '../../hooks/useMarkdown';
import { EditorContainer } from './styles';

type EditorProps = TextFieldProps;
const Editor: React.SFC<EditorProps> = ({ value = '', variant, ...props }) => {
  const markdownValue = useMarkdown(`${value}`);
  return (
    <>
      <EditorContainer>
        <TextField
          id="contents"
          rows={8}
          multiline
          margin="none"
          variant={(variant as any) || 'outlined'}
          fullWidth
          value={value}
          {...props}
        />
      </EditorContainer>
      <Divider withMargin />
      <div>
        <div dangerouslySetInnerHTML={{ __html: markdownValue }} />
      </div>
    </>
  );
};

export default memo(Editor);
