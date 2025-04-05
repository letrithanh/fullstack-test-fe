import EventsServerService from "@/control/events/events-service.server";

export async function GET() {
    const eventsServerService = new EventsServerService();
    const events = await eventsServerService.getEvents();
    return Response.json(events);
}
