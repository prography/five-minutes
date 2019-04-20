import { useEffect, useMemo } from 'react';
import marked, { MarkedOptions } from 'marked';

const useMarkdown = (value: string, option: MarkedOptions = {}) => {
  useEffect(() => {
    marked.setOptions(option);
  }, []);
  const markedValue = useMemo(() => marked(value), [value]);
  return markedValue;
};

export default useMarkdown;
