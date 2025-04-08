"use client"

import { CLASS_JOINER } from "@/utils/class-handler";
import { EventsTableItem, EventsTableProps } from "./events-table.interface";
import Pagination from "@/components/pagination/pagination.component";
import { useState } from "react";
import { EVENTS_TABLE_CMS } from "@/cms/events-table/events-table.cms";

export default function EventsTable(props: EventsTableProps) {

    const MAX_ITEMS_PER_PAGE = props.maxItemsPerPage || 5;
    
    const [activePage, setActivePage] = useState(1);

    function paginateEvents(
        events: EventsTableItem[],
        activePage: number,
        maxItemsPerPage: number = 10
    ): EventsTableItem[] {
        const startIndex = (activePage - 1) * maxItemsPerPage;
        const endIndex = startIndex + maxItemsPerPage;
        return events.slice(startIndex, endIndex);
    }

    function calculateNumberOfPages(): number {
        return Math.ceil(props.events.length / MAX_ITEMS_PER_PAGE);
    }   

    function getEvents(): EventsTableItem[] {
        const paginatedEvents = paginateEvents(props.events, activePage, MAX_ITEMS_PER_PAGE);
        const hasEvents = props.events.length > 0;
        const notValidActivePage = activePage > calculateNumberOfPages()
        if (hasEvents && notValidActivePage) {
            setActivePage(1)
        }

        return paginatedEvents;
    }

    function onPageClicked(pageNumber: number) {
        setActivePage(pageNumber)
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold text-gray-900">
                        {props.title}
                    </h1>
                    {props.description && (
                        <p className="mt-2 text-sm text-gray-700">
                            {props.description}
                        </p>
                    )}
                </div>
                {props.textActionButton && (
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <button
                            type="button"
                            className="block rounded-md bg-gray-800 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-gray-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 cursor-pointer"
                            onClick={props.onActionButtonClicked}
                        >
                            {props.textActionButton}
                        </button>
                    </div>
                )}
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle">
                        {getEvents().length == 0 && (
                            <div className="py-4 text-base font-semibold text-gray-900 grid place-items-center">
                                {EVENTS_TABLE_CMS.NO_EVENT_LABEL[props.languageCMS]}
                            </div>
                        )}
                        {getEvents().length > 0 && (
                            <table className="min-w-full border-separate border-spacing-0">
                                <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter sm:pl-6 lg:pl-8"
                                        >
                                            {EVENTS_TABLE_CMS.TITLE_LABEL[props.languageCMS]}
                                        </th>
                                        <th
                                            scope="col"
                                            className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter sm:table-cell"
                                        >
                                            {EVENTS_TABLE_CMS.LOCATION_LABEL[props.languageCMS]}
                                        </th>
                                        <th
                                            scope="col"
                                            className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter lg:table-cell"
                                        >
                                            {EVENTS_TABLE_CMS.DATE_LABEL[props.languageCMS]}
                                        </th>
                                        <th
                                            scope="col"
                                            className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter lg:table-cell"
                                        >
                                            {EVENTS_TABLE_CMS.SLOT_LABEL[props.languageCMS]}
                                        </th>
                                        <th
                                            scope="col"
                                            className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 py-3.5 pr-4 pl-3 backdrop-blur-sm backdrop-filter sm:pr-6 lg:pr-8"
                                        >
                                            <span className="sr-only">
                                                {EVENTS_TABLE_CMS.DETAIL_LABEL[props.languageCMS]}
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getEvents().map((event, eventIndex) => (
                                        <tr key={event.id}>
                                            <td
                                                className={CLASS_JOINER(
                                                    eventIndex !==
                                                        getEvents().length - 1
                                                        ? "border-b border-gray-200"
                                                        : "",
                                                    "py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 lg:pl-8"
                                                )}
                                            >
                                                {event.title}
                                            </td>
                                            <td
                                                className={CLASS_JOINER(
                                                    eventIndex !==
                                                        getEvents().length - 1
                                                        ? "border-b border-gray-200"
                                                        : "",
                                                    "px-3 py-4 text-sm whitespace-nowrap text-gray-500 sm:table-cell"
                                                )}
                                            >
                                                {event.location}
                                            </td>
                                            <td
                                                className={CLASS_JOINER(
                                                    eventIndex !==
                                                        getEvents().length - 1
                                                        ? "border-b border-gray-200"
                                                        : "",
                                                    "hidden px-3 py-4 text-sm whitespace-nowrap text-gray-500 lg:table-cell"
                                                )}
                                            >
                                                {event.date}
                                            </td>
                                            <td
                                                className={CLASS_JOINER(
                                                    eventIndex !==
                                                        getEvents().length - 1
                                                        ? "border-b border-gray-200"
                                                        : "",
                                                    "hidden px-3 py-4 text-sm whitespace-nowrap text-gray-500 lg:table-cell"
                                                )}
                                            >
                                                {event.slot}
                                            </td>
                                            <td
                                                className={CLASS_JOINER(
                                                    eventIndex !==
                                                        getEvents().length - 1
                                                        ? "border-b border-gray-200"
                                                        : "",
                                                    "relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-8 lg:pr-8"
                                                )}
                                            >
                                                <a
                                                    className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                                                    onClick={() => event?.onClick != null ? event.onClick(event.id) : {}}
                                                >
                                                    {EVENTS_TABLE_CMS.DETAIL_LABEL[props.languageCMS]}
                                                    <span className="sr-only">
                                                        , {event.id}
                                                    </span>
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
            {
                getEvents().length > 0 &&
                <div className="">
                    <Pagination 
                        numberOfPage={calculateNumberOfPages()}
                        activePage={activePage}
                        onPageClicked={onPageClicked}
                    />
                </div>
            }
        </div>
    );
}
