import { useMemo } from 'react';
import format from 'date-fns/format';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import differenceInWeeks from 'date-fns/difference_in_weeks';
import ko from 'date-fns/locale/ko';

type UseDateFormat = (date: string | number | Date, format?: string) => string;

const DEFAULT_FORMAT = 'YYYY-MM-DD';
const useDateFormat: UseDateFormat = (date, dateFormat) => {
  const formatted = useMemo(() => {
    if (dateFormat) {
      return format(date, dateFormat);
    }
    return differenceInWeeks(new Date(), date) >= 1
      ? format(date, DEFAULT_FORMAT)
      : `${distanceInWordsToNow(date, { locale: ko })}전`;
  }, [date, dateFormat]);
  return formatted;
};

export default useDateFormat;
