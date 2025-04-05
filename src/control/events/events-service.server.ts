export default class EventsServerService {
    public async getEvents() {
        const url = `${process.env.BACKEND_URL}/events`;
        const response = await fetch(url)
        return await response.json();
    }
}
