import { useMemo, useState } from "react";
import s from "./DatePicker.module.css";

interface DatePickerProps {
  value: Date;
  onChange: (value: Date) => void;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DAYS_OF_WEEK = ["Mon", "Tue", "Wen", "Thu", "Fri", "Sut", "Sun"];

const VISIBLE_CELLS_AMOUNT = 7 * 6;

interface DateCellItem {
  year: number;
  month: number;
  day: number;
}

const getDaysAmountInAMonth = (year: number, month: number) => {
  const nextMonthDate = new Date(year, month + 1, 1);
  nextMonthDate.setMinutes(-1);
  return nextMonthDate.getDate();
};

const getCurrentMonthDays = (
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

const getPreviousMonthDays = (year: number, month: number) => {
  const previousMonthFirstDay = new Date(year, month, 1);
  const dayOfWeek = previousMonthFirstDay.getDay();
  const prevMonthCellsAmount = dayOfWeek - 1;

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

const getNextMonthDays = (year: number, month: number) => {
  const previousMonthFirstDay = new Date(year, month, 1);
  const dayOfWeek = previousMonthFirstDay.getDay();
  const prevMonthCellsAmount = dayOfWeek - 1;

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

export const DatePicker = ({ value, onChange }: DatePickerProps) => {
  const [panelYear, setPanelYear] = useState(() => value.getFullYear());
  const [panelMonth, setPanelMonth] = useState(() => value.getMonth());

  const [year, month, day] = useMemo(() => {
    const currentYear = value.getFullYear();
    const currentMonth = value.getMonth();
    const currentDay = value.getDate();

    return [currentYear, currentMonth, currentDay];
  }, [value]);

  const dataCells = useMemo(() => {
    const daysInAMonth = getDaysAmountInAMonth(panelYear, panelMonth);

    const currentMonthDays = getCurrentMonthDays(
      panelYear,
      panelMonth,
      daysInAMonth
    );
    const previousMonthDays = getPreviousMonthDays(panelYear, panelMonth);
    const nextMonthDays = getNextMonthDays(panelYear, panelMonth);

    return [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
  }, [panelMonth, panelYear]);

  const onDataSelect = ({ year, month, day }: DateCellItem) => {
    console.log({ year, month, day });
    onChange(new Date(year, month, day));
  };

  const nextYear = () => {
    setPanelYear((prevYear) => prevYear + 1);
  };

  const prevYear = () => {
    setPanelYear((prevYear) => prevYear - 1);
  };

  const nextMonth = () => {
    if (panelMonth === 11) {
      setPanelMonth(0);
      setPanelYear((prevYear) => prevYear + 1);
    } else {
      setPanelMonth((prevMonth) => prevMonth + 1);
    }
  };

  const prevMonth = () => {
    if (panelMonth === 0) {
      setPanelMonth(11);
      setPanelYear((prevYear) => prevYear - 1);
    } else {
      setPanelMonth((prevMonth) => prevMonth - 1);
    }
  };

  return (
    <>
      <div className={s.buttonsWrapper}>
        <button onClick={prevYear}>prev year</button>
        <button onClick={prevMonth}>prev month</button>
        <button onClick={nextMonth}>next month</button>
        <button onClick={nextYear}>next year</button>
      </div>

      <div className={s.dateCells}>
        {DAYS_OF_WEEK.map((day) => (
          <div key={day} className={s.dateCellItem}>
            {day}
          </div>
        ))}

        {dataCells.map((dataCell) => {
          const isCurrentDate =
            dataCell.year === year &&
            dataCell.month === month &&
            dataCell.day === day;

          return (
            <div
              key={`${dataCell.day}-${dataCell.month}-${dataCell.year}`}
              onClick={() => onDataSelect(dataCell)}
              style={dataCell.month === panelMonth ? {} : { color: "#ccc" }}
              className={`${s.dateCellItem} ${
                isCurrentDate && s.dateCellItemCurrent
              }`}
            >
              {dataCell.day}
            </div>
          );
        })}
      </div>
    </>
  );
};
