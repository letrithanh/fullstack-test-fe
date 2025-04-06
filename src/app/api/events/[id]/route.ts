import EventsServerService from "@/control/events/events-service.server";
import { Event } from "@/entity/event/event.entity";

export async function PUT(request: Request) {
    const event: Event = await request.json();
    const eventsServerService = new EventsServerService();
    const createdEvent = await eventsServerService.updateEvent(event);
    return Response.json(createdEvent);
}
