import { date } from 'quasar';

export const formatDate = (
  timestamp: string | number | Date | undefined
): string => {
  return date.formatDate(timestamp, 'YYYY/MM/DD');
};

export const formatTime = (
  timestamp: string | number | Date | undefined
): string => {
  return date.formatDate(timestamp, 'HH:mm');
};

export const getAge = (
  timestamp: string | number | Date | undefined
): string => {
  const now = new Date();
  const unit = 'years';
  if (timestamp) {
    const difference = date.getDateDiff(now, timestamp, unit);
    return difference.toString();
  }
  return 'unknown';
};
