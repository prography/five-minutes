import { useEffect, useState } from 'react';
import marked, { MarkedOptions } from 'marked';
import hljs from 'highlight.js/lib/highlight';
import highlightLang from '../constants/highlight.json';

marked.setOptions({
  highlight: (code, lang, callback): any => {
    if (lang && callback) {
      const path = (highlightLang as any)[lang];
      if (!path) {
        return callback(null, code);
      }
      import(`highlight.js/lib/languages/${path}`).then(
        module => {
          hljs.registerLanguage(path, module.default);
          return callback(null, hljs.highlight(path, code).value);
        },
        err => {
          callback(err, hljs.highlightAuto(code).value);
        },
      );
    }
    return code;
  },
});

const useMarkdown = (value: string, option?: MarkedOptions) => {
  const [markdown, setMarkdown] = useState(value);
  useEffect(() => {
    if (option) {
      marked.setOptions(option);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);
  useEffect(() => {
    marked(value, (err, result) => {
      setMarkdown(result);
    });
  }, [value]);
  return markdown;
};

export default useMarkdown;
