export interface DatePickerProps {

    date: Date;

    label?: string;

    rightLabel?: string;

    onSelectDate?: (date: Date) => void;
}