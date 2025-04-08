import { JSX } from "react";

export interface DatePickerProps {

    date: Date;

    label?: string;

    rightLabel?: string;

    onSelectDate?: (date: Date) => void;

    errorMessage?: JSX.Element;

    isError?: boolean;
}