import { Event } from "@/entity/event/event.entity";

export default class EventsServerService {
    private EVENTS_URL = `${process.env.BACKEND_URL}/events`;

    public async getEvents() {
        const url = this.EVENTS_URL;
        const response = await fetch(url);
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
        return await response.json();
    }
}
