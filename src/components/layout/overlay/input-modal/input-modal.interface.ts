import { ReactNode } from "react";

export interface InputModalProps {

    open: boolean;

    onClose?: (value: boolean) => void;

    onSecondary?: () => void;

    onPrimary?: () => void;

    textPrimary: string;

    textSecondary: string;

    children: ReactNode

}