import { ReactNode } from "react";

export interface SearchStackedLayoutProps {
    children: ReactNode;
    onSearchChanged: (text: string) => void;
    label?: string;
}