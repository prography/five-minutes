import { useEffect, useMemo } from 'react';
import marked, { MarkedOptions } from 'marked';
import { highlight, highlightAuto, getLanguage } from 'highlight.js';

marked.setOptions({
  highlight: (code, lang) => {
    return !!(lang && getLanguage(lang))
      ? highlight(lang, code).value
      : highlightAuto(code).value;
  },
});

const useMarkdown = (value: string, option?: MarkedOptions) => {
  useEffect(() => {
    if (option) {
      marked.setOptions(option);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);
  return useMemo(() => marked(value), [value]);
};

export default useMarkdown;
