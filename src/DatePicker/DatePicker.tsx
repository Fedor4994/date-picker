import { useLayoutEffect, useMemo, useState } from "react";
import s from "./DatePicker.module.css";
import {
  getCurrentMonthDays,
  getDaysAmountInAMonth,
  getNextMonthDays,
  getPreviousMonthDays,
  isToday,
} from "./utils";
import { DateCellItem, DatePickerProps } from "../types/DatePicker.types";
import { DAYS_OF_WEEK } from "../constants/DatePicker.constants";

export const DatePicker = ({ value, onChange }: DatePickerProps) => {
  const [panelYear, setPanelYear] = useState(() => value.getFullYear());
  const [panelMonth, setPanelMonth] = useState(() => value.getMonth());
  const todayDate = useMemo(() => new Date(), []);

  const [year, month, day] = useMemo(() => {
    const currentYear = value.getFullYear();
    const currentMonth = value.getMonth();
    const currentDay = value.getDate();

    return [currentYear, currentMonth, currentDay];
  }, [value]);

  useLayoutEffect(() => {
    setPanelMonth(month);
    setPanelYear(year);
  }, [year, month]);

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
              } ${isToday(todayDate, dataCell) && s.dateCellItemToday}`}
            >
              <div className={s.dataCellItemDate}> {dataCell.day}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};
