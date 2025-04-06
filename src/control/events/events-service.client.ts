import { Event } from "@/entity/event/event.entity";

export class EventsClientService {
    private EVENTS_PATH = "/api/events"


    public async getEvents() {
        const url = `${this.EVENTS_PATH}`;
        const response = await fetch(url)
        return await response.json();
    }

    public async createEvent(data: Event) {
        const url = `${this.EVENTS_PATH}`;
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data)
        });
        return await response.json();
    }
}