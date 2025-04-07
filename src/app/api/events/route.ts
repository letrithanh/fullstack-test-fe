import EventsServerService from "@/control/events/events-service.server";
import { Event } from "@/entity/event/event.entity";

export async function GET() {
    const eventsServerService = new EventsServerService();
    const events = await eventsServerService.getEvents();
    return Response.json(events);
}

export async function POST(request: Request) {
    const event: Event = await request.json();
    const eventsServerService = new EventsServerService();
    const createdEvent = await eventsServerService.createEvent(event);
    return Response.json(createdEvent, { status: createdEvent.status || 200 });
}
