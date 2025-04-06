import { Event } from "@/entity/event/event.entity";
import { useState } from "react"

export interface AssignedEvent {
    event?: Event
}

export interface EventAction {
    reset: () => void,
    update: (event: Event) => void,
    hasValue: () => boolean
}

export interface UseEventState {
    event?: Event,
}

export const useEvent = (initializeValue?: Event): [AssignedEvent, EventAction] => {

    const [eventState, setEventState] = useState<UseEventState>({
        event: initializeValue,
    });

    return [
        {
            event: eventState.event
        },
        {
            reset: () => {
                setEventState({
                    event: initializeValue
                });
            },
            update: (updateValue) => {
                setEventState({
                    event: updateValue
                });
            },
            hasValue: () => {
                return eventState.event != null;
            }
        }
    ];
};