export interface Event {
    id?: number;
    title: string;
    description: string;
    date: string;
    location: string;
    maxAttendees: number;
    createdAt?: Date;
    updatedAt?: Date;
    deleted?: boolean;
    joinedAttendee?: number;
}
