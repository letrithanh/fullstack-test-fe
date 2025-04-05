import { EventsTableItem } from "@/components/layout/table/events-table/events-table.interface";
import { Event } from "@/entity/event/event.entity";
import DateFormatter from "@/utils/date-formatter";

export default class EventsAdapter {
    
    public static toEventsTableItem(
        event: Event,
        onClickCallback: (id: number) => void
    ): EventsTableItem {
        return {
            id: event.id || 0,
            location: event.location,
            date: DateFormatter.format(new Date(event.date), "dd/MM/yyyy"),
            slot: `${event.joinedAttendee}/${event.maxAttendees}`,
            title: event.title,
            onClick: onClickCallback,
        };
    }

    public static toEventsTableItems(
        events: Event[],
        onClickCallback: (id: number) => void
    ): EventsTableItem[] {
        if (events == null) {
            return [];
        }

        return events.map((event) =>
            this.toEventsTableItem(event, onClickCallback)
        );
    }
}
