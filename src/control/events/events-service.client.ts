export class EventsClientService {
    private EVENTS_PATH = "/api/events"


    public async getEvents() {
        const url = `${this.EVENTS_PATH}`;
        const response = await fetch(url)
        return await response.json();
    }

}