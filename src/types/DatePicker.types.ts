export interface DatePickerProps {
  value: Date;
  onChange: (value: Date) => void;
}

export interface DateCellItem {
  year: number;
  month: number;
  day: number;
}
