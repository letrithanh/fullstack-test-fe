import { Attendee } from "@/entity/attendee/attendee.entity";
import { Event } from "@/entity/event/event.entity";

export default class EventsServerService {
    private EVENTS_URL = `${process.env.BACKEND_URL}/events`;

    public async getEvents() {
        const url = this.EVENTS_URL;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(await response.json())
        }

        return await response.json();
    }

    public async createEvent(data: Event) {
        const url = this.EVENTS_URL;
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            return {
                status: response.status,
                message: errorData.message
            }
        }

        return await response.json();
    }

    public async updateEvent(data: Event) {
        const url = `${this.EVENTS_URL}/${data.id}`;
        const response = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            return {
                status: response.status,
                message: errorData.message
            }
        }

        return await response.json();
    }

    public async deleteEvent(id: number) {
        const url = `${this.EVENTS_URL}/${id}`;
        const response = await fetch(url, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error(await response.json())
        }

        return await response.json();
    }

    public async register(eventId: number | string, attendee: Attendee) {
        const url = `${this.EVENTS_URL}/${eventId}/register`;
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(attendee),
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            return {
                status: response.status,
                message: errorData.message
            }
        }

        return await response.json();
    }
}
