import React, { memo, useEffect } from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import Spinner from '@material-ui/core/CircularProgress';
import { Divider } from '../../components';
import useMarkdown from '../../hooks/useMarkdown';
import { EditorContainer, Loading } from './styles';
import { usePrevious } from '../../hooks';

type EditorProps = TextFieldProps & { isLoading?: boolean };
const Editor: React.SFC<EditorProps> = ({ value = '', variant, isLoading = false, ...props }) => {
  const prevLoading = usePrevious(isLoading);
  useEffect(() => {
    if (prevLoading && !isLoading && props.inputRef) {
      'current' in props.inputRef && props.inputRef.current.focus();
    }
  }, [prevLoading, isLoading, props.inputRef]);
  const markdownValue = useMarkdown(`${value}`);
  return (
    <>
      <EditorContainer>
        {isLoading && <Loading><Spinner /></Loading>}
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
