import { useEffect, useState } from 'react';
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
  const [markedValue, setMarkedValue] = useState(marked(value));
  useEffect(() => {
    if (option) {
      marked.setOptions(option);
    }
    setMarkedValue(marked(value));
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);
  return markedValue;
};

export default useMarkdown;
