import EventsServerService from "@/control/events/events-service.server";
import { Event } from "@/entity/event/event.entity";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const title = searchParams.get('title')
    const eventsServerService = new EventsServerService();
    const events = await eventsServerService.getEvents(title as string);
    return Response.json(events);
}

export async function POST(request: Request) {
    const event: Event = await request.json();
    const eventsServerService = new EventsServerService();
    const createdEvent = await eventsServerService.createEvent(event);
    return Response.json(createdEvent, { status: createdEvent.status || 200 });
}
