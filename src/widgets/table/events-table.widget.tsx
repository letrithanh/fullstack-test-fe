"use client";

import EventsTable from "@/components/layout/table/events-table/events-table.component";
import EventsAdapter from "@/control/events/events-adapter";
import { EventsClientService } from "@/control/events/events-service.client";
import { Event } from "@/entity/event/event.entity";
import { useApplication } from "@/hooks/client/application/application.hook";
import { ADD_EVENT_PATH } from "@/utils/application-path";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EventsTableWidget() {
    const {
        search: [assignedSearch,],
    } = useApplication();

    const router = useRouter();

    // TODO: Detail hander
    const onEventClicked = (id: number) => {
        alert(id);
    };

    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const eventsClientService = new EventsClientService();
        eventsClientService
            .getEvents()
            .then((onfulfilled) => {
                setEvents([...onfulfilled]);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    function filter(events: Event[]): Event[] {
        return events.filter(event => event.title.toLowerCase().indexOf(assignedSearch.value.trim()) >= 0)
    }

    function onAddEventClick() {
        router.push(ADD_EVENT_PATH)
    }

    return (
        <EventsTable
            title="Events"
            description="A list of all the events."
            textActionButton="Add event"
            events={EventsAdapter.toEventsTableItems(filter(events), onEventClicked)}
            onActionButtonClicked={onAddEventClick}
            maxItemsPerPage={5}
        />
    );
}
