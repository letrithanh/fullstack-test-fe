"use client";
import FormStackedLayout from "@/components/layout/form-stacked-layout/form-stacked-layout.component";
import { useApplication } from "@/hooks/client/application/application.hook";
import { EVENT_MANAGEMENT_PATH, HOME_PATH } from "@/utils/application-path";
import DateFormatter from "@/utils/date-formatter";
import {
    ArrowLeftIcon,
    CalendarDateRangeIcon,
    MapPinIcon,
    UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function EventDetailWidget() {
    
    const {
        selectedEvent: [assignedSelectedEvent, selectedEventAction],
    } = useApplication();

    const router = useRouter();

    useEffect(() => {
        if (assignedSelectedEvent.event == null) {
            router.push(HOME_PATH);
        }
    }, [])

    function onExit() {
        selectedEventAction.reset();
        router.push(HOME_PATH)
    }

    function onEdit() {
        router.push(EVENT_MANAGEMENT_PATH)
    }

    return (
        <FormStackedLayout>
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight flex items-center gap-4">
                        <ArrowLeftIcon className="h-8 w-8 cursor-pointer" onClick={onExit}/>
                        {assignedSelectedEvent.event?.title}
                    </h2>
                </div>
                <div className="mt-4 flex md:mt-0 md:ml-4">
                    <button
                        type="button"
                        className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs ring-red-100 ring-inset hover:bg-red-700 cursor-pointer"
                        
                    >
                        Delete
                    </button>
                    <button
                        type="button"
                        className="ml-3 rounded-sm bg-white px-4 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 cursor-pointer"
                        onClick={onEdit}
                    >
                        Edit
                    </button>
                </div>
            </div>
            <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm my-6">
                <div className="px-4 py-4 sm:px-6">
                    {/* Content goes here */}
                    {/* We use less vertical padding on card footers at all sizes than on headers or body sections */}
                    <div>
                        {assignedSelectedEvent.event?.description}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-4 py-5 sm:p-6">
                    <div className="overflow-hidden rounded-lg bg-gray-200 text-gray-700 shadow-md grid place-items-center">
                        <div className="px-4 py-5 sm:p-6 flex flex-col items-center">
                            <MapPinIcon className="h-16 w-16" />
                            <span className="grid place-items-center truncate w-full max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                                {assignedSelectedEvent.event?.location}
                            </span>
                        </div>
                    </div>
                    <div className="overflow-hidden rounded-lg bg-gray-200 text-gray-700 shadow-md grid place-items-center">
                        <div className="px-4 py-5 sm:p-6 flex flex-col items-center">
                            <CalendarDateRangeIcon className="h-16 w-16" />
                            <span className="grid place-items-center truncate w-full max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                                {DateFormatter.format(new Date(assignedSelectedEvent.event?.date || new Date()), "dd-MM-yyyy")}
                            </span>
                        </div>
                    </div>
                    <div className="overflow-hidden rounded-lg bg-gray-200 text-gray-700 shadow-md grid place-items-center">
                        <div className="px-4 py-5 sm:p-6 flex flex-col items-center">
                            <UserGroupIcon className="h-16 w-16" />
                            <span className="grid place-items-center truncate w-full max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                                {`${assignedSelectedEvent.event?.joinedAttendee}/${assignedSelectedEvent.event?.maxAttendees}`}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="">
                <button
                    type="button"
                    className="w-full grid place-items-center items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                >
                    Register
                </button>
            </div>
        </FormStackedLayout>
    );
}
