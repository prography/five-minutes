import { useMemo } from 'react';
import { format, distanceInWordsToNow, differenceInWeeks } from 'date-fns';
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
  }, [date]);
  return formatted;
};

export default useDateFormat;
