import React, { useCallback, useEffect } from 'react';
import Progress from '@material-ui/core/CircularProgress';
import { IQuestionListItem } from '../../../models/question';
import { QuestionListItem } from '../..';
import { useIntersect } from '../../../hooks';
import { OnIntersect } from '../../../hooks/useIntersect';
import { ContentListWrapper } from './style';

interface IContentListProps {
  fetchMore: () => void;
  status: Status;
  items: IQuestionListItem[];
  hasNext: boolean;
}
const ContentList: React.SFC<IContentListProps> = ({
  status,
  fetchMore,
  items,
  hasNext,
}) => {
  const onIntersect: OnIntersect = useCallback(
    (entry, observer) => {
      observer.unobserve(entry.target);
      hasNext && fetchMore();
    },
    [hasNext, fetchMore],
  );
  const [ref, setRef, observer] = useIntersect(onIntersect);
  useEffect(() => {
    if (hasNext && status === 'SUCCESS') {
      ref && observer && observer.observe(ref);
    }
  }, [hasNext, status, observer, ref]);
  if (items.length === 0) return null;
  return (
    <>
      <ContentListWrapper>
        {items.map(item => (
          <QuestionListItem key={item.id} {...item} />
        ))}
      </ContentListWrapper>
      <div ref={setRef} style={{ height: 60 }}>
        {status === 'FETCHING' && <Progress />}
      </div>
    </>
  );
};

export default ContentList;
