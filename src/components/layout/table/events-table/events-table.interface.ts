import { LanguageCMS } from "@/cms/language-cms.type";

export interface EventsTableProps {

    title: string;

    description?: string;

    textActionButton?: string;

    onActionButtonClicked?: () => void;

    events: EventsTableItem[];

    maxItemsPerPage?: number;

    languageCMS: LanguageCMS;
}

export interface EventsTableItem {

    id: number;

    title: string;

    location: string;

    date: string;

    slot: string;

    onClick?: (id: number) => void

}