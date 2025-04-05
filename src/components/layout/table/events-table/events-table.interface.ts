export interface EventsTableProps {

    title: string;

    description?: string;

    textActionButton?: string;

    onActionButtonClicked?: () => void;

    events: EventsTableItem[];

}

export interface EventsTableItem {

    id: number;

    title: string;

    location: string;

    date: string;

    slot: string;

    onClick?: (id: number) => void

}