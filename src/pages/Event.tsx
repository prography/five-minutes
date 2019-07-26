import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { MainLayout, Title } from '../styles/common';
import { Codemirror, Confirm } from '../components';
import { EditorFromTextArea } from 'codemirror';
import { makeSelectable } from '../utils/select';
import { ValueType } from 'react-select/lib/types';
import { IOptionValue } from '../models/select';
import { useApi } from '../hooks';
import { runCode, postHonor } from '../api/event';
import { RunnableCode } from '../models/event';
import { CODE_PRESET } from '../constants/event';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '../reducers';
import { IPostQuestion } from '../models/question';
import { postQuestionActions } from '../actions/question';
import { notifier } from '../utils/renoti';

const EVENT_MODES: RunnableCode[] = [
  'Javascript',
  'Typescript',
  'Python',
  'C',
  'JAVA',
];

const SELECTABLE_MODES = makeSelectable<RunnableCode>(EVENT_MODES);

const Submit = styled.div`
  margin: 10px 0;
  text-align: right;
  button {
    margin-left: 10px;
  }
`;
const Time = styled.div`
  text-align: center;
  font-size: 36px;
`;
const Description = styled.p`
  text-align: center;
`;
const ModeSelect = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  & > div {
    margin-left: 10px;
    min-width: 150px;
  }
`;
const Result = styled.pre`
  margin: 10px 0;
  padding: 10px;
  height: 150px;
  color: white;
  background-color: #263747;
  overflow-y: auto;
`;

interface TimerProps {
  startTime?: number;
}
const Timer: React.SFC<TimerProps> = ({ startTime }) => {
  const [time, setTime] = useState(startTime ? Date.now() - startTime : 0);
  useEffect(() => {
    let interval: number | undefined;
    if (startTime) {
      const handler = () => {
        setTime(Date.now() - startTime);
      };
      interval = setInterval(handler, 1);
    }
    return interval ? () => clearInterval(interval) : undefined;
  }, [startTime]);
  const timeBySeconds = time / 1000;
  const minutes = String(Math.floor(timeBySeconds / 60)).padStart(2, '0');
  const seconds = String(Math.floor(timeBySeconds % 60)).padStart(2, '0');
  return (
    <Time>
      {minutes} : {seconds}
    </Time>
  );
};

const Event: React.SFC = () => {
  /* 코드 에디터 */
  const [editor, setEditor] = useState<EditorFromTextArea | null>(null);
  const [mode, setMode] = useState<RunnableCode>('Javascript');
  const defaultValue = useMemo(() => ({ label: mode, value: mode }), [mode]);
  const handleModeChange = useCallback(
    (option: ValueType<IOptionValue<RunnableCode>>) => {
      if (option && !('length' in option)) {
        setMode(option.value);
      }
    },
    [setMode],
  );
  // 모드 변경시 프리셋 추가
  useEffect(() => {
    if (editor) {
      editor.setValue(CODE_PRESET[mode]);
    }
  }, [editor, mode]);

  /* 컨펌 모달*/
  const [confirm, setConfirm] = useState(false);
  const openConfirm = useCallback(() => setConfirm(true), []);
  const closeConfirm = useCallback(() => setConfirm(false), []);

  /* 타이머 */
  const [startTime, setStartTime] = useState(0);
  // 코드 작성시 타이머 실행
  useEffect(() => {
    if (editor) {
      const handler = () => {
        setStartTime(Date.now());
        editor.off('keydown', handler);
      };
      editor.on('keydown', handler);
    }
  }, [editor]);

  /* 코드 실행 */
  const [runResult, setRunResult] = useState('');
  const { api, status: runStatus } = useApi(runCode);
  const handleRunCode = useCallback(async () => {
    if (!editor) return;
    try {
      const { result } = await api({ code: editor.getValue(), language: mode });
      setRunResult(result);
    } catch (err) {
      setRunResult('에러가 발생하였습니다.');
    }
  }, [api, editor, mode]);
  const isRunning = runStatus === 'FETCHING';

  /* 코드 질문으로 올리기 */
  const postStatus = useSelector(
    (state: IRootState) => state.question.post.status,
  );
  const dispatch = useDispatch();
  const handlePostQuestion = useCallback(
    (question: IPostQuestion) => {
      dispatch(postQuestionActions.request(question));
    },
    [dispatch],
  );
  /* 코드 제출 */
  const { nickname, email } = useSelector((state: IRootState) => ({
    nickname: state.auth.me.user.nickname,
    email: state.auth.me.user.email,
  }));
  const { api: honorApi, status: honorStatus } = useApi(postHonor);
  const isPosting = honorStatus === 'FETCHING' || postStatus === 'FETCHING';
  const handleSumbit = async () => {
    if (runStatus === 'INIT') {
      return notifier.notify({
        type: 'error',
        position: 'bottom-center',
        message: '제출하기전에 코드를 꼭 실행해주세요!',
      });
    }
    const duration = Date.now() - startTime;
    try {
      await honorApi({
        name: nickname,
        mail: email,
        agreeReceivingMail: false,
        duration,
      });
    } catch (err) {
      notifier.notify({
        type: 'error',
        position: 'bottom-center',
        message: '에러가 발생하였습니다. 다시 시도해주세요.',
      });
    }
    const code = editor ? editor.getValue() : '';
    handlePostQuestion({
      subject: '[데모데이 이벤트] 코드 맞추기',
      content: `## [출력 결과] \n${runResult}`,
      code,
      language: mode,
      tags: ['event'],
    });
  };
  const handleConfirm = () => {
    handleSumbit();
    closeConfirm();
  };
  return (
    <MainLayout>
      <Title>
        이벤트{' '}
        <span role="img" aria-label="trophy">
          🏆
        </span>
      </Title>
      <Timer startTime={startTime} />
      <Description>
        {!startTime ? (
          <>
            <span role="img" aria-label="time">
              ⏳
            </span>{' '}
            코드 입력시 타이머가 시작합니다!
          </>
        ) : (
          <>
            <span role="img" aria-label="fire">
              🔥
            </span>{' '}
            타이머가 시작되었습니다.
          </>
        )}
        <br />
      </Description>
      <Codemirror value="" mode={mode} setCodeEditor={setEditor} />
      <ModeSelect>
        <span role="img" aria-label="caution">
          ⚠️
        </span>{' '}
        언어 변경시 코드가 초기화됩니다. 주의하세요!
        <Select
          options={SELECTABLE_MODES}
          defaultValue={defaultValue}
          onChange={handleModeChange}
        />
      </ModeSelect>
      <Result>
        {isRunning
          ? '코드를 실행중입니다...'
          : runStatus === 'INIT'
          ? '실행 결과가 여기에 표시됩니다.'
          : runResult}
      </Result>
      <Submit>
        <Button
          color="primary"
          variant="outlined"
          onClick={handleRunCode}
          disabled={isRunning}
        >
          실행하기
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={openConfirm}
          disabled={isPosting || isRunning}
        >
          제출하기
        </Button>
      </Submit>
      <Confirm
        open={confirm}
        title="정말 제출하시겠습니까?"
        message={`
          제출 언어: ${mode}
          제출하면 더 이상 코드를 수정할 수 없습니다.
        `}
        onClose={closeConfirm}
        onAgree={handleConfirm}
        onDisagree={closeConfirm}
      />
    </MainLayout>
  );
};

export default Event;
