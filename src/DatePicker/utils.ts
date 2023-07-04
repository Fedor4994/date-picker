import {
  MONDAY_WEEK_MAP,
  VISIBLE_CELLS_AMOUNT,
} from "../constants/DatePicker.constants";
import { DateCellItem } from "../types/DatePicker.types";

const getDaysOfTheWeek = (date: Date) => {
  const day = date.getDay();

  return MONDAY_WEEK_MAP[day];
};

export const getDaysAmountInAMonth = (year: number, month: number) => {
  const nextMonthDate = new Date(year, month + 1, 1);
  nextMonthDate.setMinutes(-1);
  return nextMonthDate.getDate();
};

export const getCurrentMonthDays = (
  year: number,
  month: number,
  numberOfDays: number
) => {
  const dateCells: DateCellItem[] = [];

  for (let i = 1; i <= numberOfDays; i++) {
    dateCells.push({
      year,
      month,
      day: i,
    });
  }

  return dateCells;
};

export const getPreviousMonthDays = (year: number, month: number) => {
  const previousMonthFirstDay = new Date(year, month, 1);
  const prevMonthCellsAmount = getDaysOfTheWeek(previousMonthFirstDay);

  const dayAmountInPrevMonth = getDaysAmountInAMonth(year, month - 1);

  const dateCells: DateCellItem[] = [];
  const [cellYear, cellMonth] =
    month === 0 ? [year - 1, 11] : [year, month - 1];

  for (let i = 0; i < prevMonthCellsAmount; i++) {
    dateCells.unshift({
      year: cellYear,
      month: cellMonth,
      day: dayAmountInPrevMonth - i,
    });
  }

  return dateCells;
};

export const getNextMonthDays = (year: number, month: number) => {
  const currentMonthFirstDay = new Date(year, month, 1);
  const prevMonthCellsAmount = getDaysOfTheWeek(currentMonthFirstDay);

  const daysAmount = getDaysAmountInAMonth(year, month);
  const nextMonthDays =
    VISIBLE_CELLS_AMOUNT - daysAmount - prevMonthCellsAmount;

  const dateCells: DateCellItem[] = [];
  const [cellYear, cellMonth] =
    month === 11 ? [year + 1, 0] : [year, month + 1];

  for (let i = 1; i <= nextMonthDays; i++) {
    dateCells.push({
      year: cellYear,
      month: cellMonth,
      day: i,
    });
  }

  return dateCells;
};

export const isToday = (todayDate: Date, cell: DateCellItem) => {
  return (
    todayDate.getFullYear() === cell.year &&
    todayDate.getMonth() === cell.month &&
    todayDate.getDate() === cell.day
  );
};
