import { useEffect, useMemo } from 'react';
import marked, { MarkedOptions } from 'marked';
import { highlight, highlightAuto, getLanguage } from 'highlight.js';

const useMarkdown = (value: string, option: MarkedOptions = {}) => {
  useEffect(() => {
    marked.setOptions({
      ...option,
      highlight: (code, lang) => {
        return !!(lang && getLanguage(lang))
          ? highlight(lang, code).value
          : highlightAuto(code).value;
      },
    });
  }, []);
  const markedValue = useMemo(() => marked(value), [value]);
  return markedValue;
};

export default useMarkdown;
