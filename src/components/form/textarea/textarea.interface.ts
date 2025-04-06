import { JSX, TextareaHTMLAttributes } from "react";

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {

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