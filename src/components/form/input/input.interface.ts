import { InputHTMLAttributes, JSX } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {

    /** Label for display as input group */
    label?: string,

    /** Label on the right side */
    rightLabel?: string,

    /** Description below input field */
    description?: string,

    /** Indicate for error status */
    isError?: boolean,

    /** Error message */
    errorMessage?: JSX.Element,

    /** Custom input field class name */
    customInputFieldClassName?: string
}