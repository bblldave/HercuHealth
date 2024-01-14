import { format } from "date-fns";

const DAYS_IN_WEEK = 7;
const LAST_DAY_OF_WEEK = 6;

export const parseLocalDate = (dateStr) => {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export const getStartOfWeek = (date) => {
  const dayOfWeek = date.getDay();
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - dayOfWeek);
  return startOfWeek;
};

export const getEndOfWeek = (date) => {
  const dayOfWeek = date.getDay();
  const endOfWeek = new Date(date);
  endOfWeek.setDate(date.getDate() + (LAST_DAY_OF_WEEK - dayOfWeek));
  return endOfWeek;
};

export const getWeeks = (startDateString, endDateString) => {
  const startDate = parseLocalDate(startDateString);
  const endDate = parseLocalDate(endDateString);

  const startOfWeek = getStartOfWeek(startDate);
  const endOfWeek = getEndOfWeek(endDate);

  const weeks = [];
  let currentWeekStart = new Date(startOfWeek);

  while (currentWeekStart <= endOfWeek) {
    weeks.push(new Date(currentWeekStart));
    currentWeekStart.setDate(currentWeekStart.getDate() + DAYS_IN_WEEK);
  }

  return weeks;
};