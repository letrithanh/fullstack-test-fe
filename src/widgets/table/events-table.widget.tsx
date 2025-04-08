"use client";

import { EVENTS_TABLE_CMS } from "@/cms/events-table/events-table.cms";
import EventsTable from "@/components/layout/table/events-table/events-table.component";
import EventsAdapter from "@/control/events/events-adapter";
import { EventsClientService } from "@/control/events/events-service.client";
import { Event } from "@/entity/event/event.entity";
import { useApplication } from "@/hooks/client/application/application.hook";
import { EVENT_MANAGEMENT_PATH, EVENT_DETAIL_PATH } from "@/utils/application-path";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EventsTableWidget() {
    const {
        search: [assignedSearch,],
        selectedEvent: [, selectedEventAction],
        languageCMS
    } = useApplication();

    const router = useRouter();

    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const eventsClientService = new EventsClientService();
        eventsClientService
            .getEvents(assignedSearch.value)
            .then((onfulfilled) => {
                setEvents([...onfulfilled]);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [assignedSearch,]);

    function onAddEventClick() {
        router.push(EVENT_MANAGEMENT_PATH);
    }

    function onEventClicked(id: number) {
        if (events.length > 0) {
            const filteredEvent = events.filter(e => e.id == id)[0];
            selectedEventAction.update({...filteredEvent});
            router.push(EVENT_DETAIL_PATH);
        }
    };

    function sort(events: Event[]) {
        return events.sort((e1, e2) => new Date(e1.date).getTime() - new Date(e2.date).getTime())
    }

    return (
        <EventsTable
            title={EVENTS_TABLE_CMS.EVENTS_TITLE[languageCMS]}
            description={EVENTS_TABLE_CMS.EVENTS_DESCRIPTION[languageCMS]}
            textActionButton={EVENTS_TABLE_CMS.ADD_EVENT_BUTTON[languageCMS]}
            events={EventsAdapter.toEventsTableItems(sort(events), onEventClicked)}
            onActionButtonClicked={onAddEventClick}
            maxItemsPerPage={5}
            languageCMS={languageCMS}
        />
    );
}
