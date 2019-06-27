import { useState, useCallback, useEffect } from 'react';

const INITIAL_SELECTION = [-1, -1];

const getCurrentSelection = (ref: HTMLInputElement | HTMLTextAreaElement) => {
  return ref.selectionEnd
    ? ref.selectionEnd
    : ref.value.length;
}

type SetInputValue = (callback: (input: string) => string) => void;

const useCommand = (editorRef: HTMLInputElement | HTMLTextAreaElement | null | undefined, setInputValue: SetInputValue) => {
  const [selection, setSelection] = useState(INITIAL_SELECTION);
  useEffect(() => {
    const [start, end] = selection;
    if (editorRef && start >= 0) {
      editorRef.focus();
      editorRef.setSelectionRange(start, end);
      setSelection(INITIAL_SELECTION);
    }
  }, [editorRef, selection]);
  // 헤더, 이탤릭, 볼드 등 포맷 커맨드
  const handleFormat = useCallback((formatType: 'bold' | 'italic') => {
    if (editorRef) {
      const pos = getCurrentSelection(editorRef);
      const format = formatType === 'bold' ? '**' : '*';
      const text = formatType === 'bold' ? '볼드 텍스트' : '이탤릭 텍스트';
      setInputValue(prev => `${prev.slice(0, pos)}${format}${text}${format}${prev.slice(pos)}`);
      setSelection([pos + format.length, pos + format.length + text.length]);
    }
  }, [editorRef, setInputValue]);

  // 링크 커맨드
  const handleLink = useCallback(() => {
    if (editorRef) {
      const pos = getCurrentSelection(editorRef);
      const format = '[링크 이름]';
      const url = '(https://주소를 입력하세요.)';
      setInputValue(
        prev => `${prev.slice(0, pos)}${format}${url}${prev.slice(pos)}`
      )
      setSelection([pos + format.length + 1, pos + format.length + url.length - 1]);
    }
  }, [editorRef, setInputValue]);

  return {
    handleFormat,
    handleLink,
    setSelection,
    getCurrentSelection,
  }
}

export default useCommand;