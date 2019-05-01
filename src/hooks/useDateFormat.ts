import { useMemo } from 'react';
import { format } from 'date-fns';

type UseDateFormat = (date: string | number | Date, format: string) => string;

const useDateFormat: UseDateFormat = (date, dateFormat) => {
  const formatted = useMemo(() => format(date, dateFormat), [date, dateFormat]);
  return formatted;
};

export default useDateFormat;
