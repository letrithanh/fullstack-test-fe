import { Attendee } from "@/entity/attendee/attendee.entity";
import { Event } from "@/entity/event/event.entity";

export class EventsClientService {
    private EVENTS_PATH = "/api/events"

    public async getEvents(title?: string) {
        let url = `${this.EVENTS_PATH}`;

        if (title) {
            const query = `title=${encodeURIComponent(title)}`;
            url += `?${query}`;
        }

        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(await response.json())
        }

        return await response.json();
    }

    public async createEvent(data: Event) {
        const url = `${this.EVENTS_PATH}`;
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(await response.json())
        }

        return await response.json();
    }

    public async updateEvent(data: Event) {
        const url = `${this.EVENTS_PATH}/${data.id}`;
        const response = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(await response.json())
        }

        return await response.json();
    }

    public async deleteEvent(id: number | string) {
        const url = `${this.EVENTS_PATH}/${id}`;
        const response = await fetch(url, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error(await response.json())
        }

        return await response.json();
    }

    public async register(eventId: number | string, attendee: Attendee) {
        const url = `${this.EVENTS_PATH}/${eventId}/register`;
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(attendee)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message)
        }

        return await response.json();
    }
}