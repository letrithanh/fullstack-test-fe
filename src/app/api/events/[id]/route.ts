import EventsServerService from "@/control/events/events-service.server";
import { Event } from "@/entity/event/event.entity";
import { NextRequest } from "next/server";

export async function PUT(request: Request) {
    const event: Event = await request.json();
    const eventsServerService = new EventsServerService();
    const updatedEvent = await eventsServerService.updateEvent(event);
    return Response.json(updatedEvent);
}


export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params;
    const eventsServerService = new EventsServerService();
    await eventsServerService.deleteEvent(parseInt(id));
    return Response.json({"message": "deleted"});
}