import EventsServerService from "@/control/events/events-service.server";
import { Attendee } from "@/entity/attendee/attendee.entity";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params;
    const attendee: Attendee = await request.json();
    const eventsServerService = new EventsServerService();
    const createdRegister = await eventsServerService.register(parseInt(id), attendee);
    return Response.json(createdRegister, { status: createdRegister.status || 200 });
}