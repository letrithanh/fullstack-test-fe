"use client";

import Input from "../../../components/form/input/input.component";
import TextArea from "../../../components/form/textarea/textarea.component";
import DatePicker from "../../../components/form/datepicker/date-picker.component";
import InputValidation from "@/hooks/input-validation.interface";
import { useInput } from "@/hooks/use-input.hook";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HOME_PATH } from "@/utils/application-path";
import { EventsClientService } from "@/control/events/events-service.client";
import { useApplication } from "@/hooks/client/application/application.hook";
import { EVENT_FORM_CMS } from "@/cms/event-form/event-form.cms";

export default function EventFormWidget() {
    const router = useRouter();

    const [assignedTitle, titleAction] = useInput("");
    const [assignedDescription, descriptionAction] = useInput("");
    const [date, setDate] = useState(new Date());
    const [assignedLocation, locationAction] = useInput("");
    const [assignedMaxAttendee, maxAttendeeAction] = useInput("");
    const [isSubmit, setSubmit] = useState(false);

    const {
        selectedEvent: [assignedSelectedEvent, selectedEventAction],
        languageCMS
    } = useApplication();

    useEffect(() => {
        if (isEditMode()) {
            titleAction.update(`${assignedSelectedEvent.event?.title}`);
            descriptionAction.update(`${assignedSelectedEvent.event?.description}`);
            setDate(new Date(`${assignedSelectedEvent.event?.date}`));
            locationAction.update(`${assignedSelectedEvent.event?.location}`);
            maxAttendeeAction.update(`${assignedSelectedEvent.event?.maxAttendees}`);
        }
    }, [])

    function isEditMode() {
        return selectedEventAction.hasValue();
    }

    function titleValidation(): InputValidation {
        const isTitleBlank = assignedTitle.value.trim().length == 0;
        if ((titleAction.isValueChanged() || isSubmit) && isTitleBlank) {
            return {
                isError: true,
                errorMessage: <>{EVENT_FORM_CMS.FORM_TITLE_ERROR_BLANK[languageCMS]}</>,
            };
        }

        const isExceedMaxLength = assignedTitle.value.length > 100;
        if (isExceedMaxLength) {
            return {
                isError: true,
                errorMessage: <>{EVENT_FORM_CMS.FORM_TITLE_ERROR_MAX_LENGTH[languageCMS]}</>,
            };
        }

        return {
            isError: false,
        };
    }

    function descriptionValidation(): InputValidation {
        const isDescriptionBlank = assignedDescription.value.trim().length == 0;
        if (
            (descriptionAction.isValueChanged() || isSubmit) &&
            isDescriptionBlank
        ) {
            return {
                isError: true,
                errorMessage: <>{EVENT_FORM_CMS.FORM_DESCRIPTION_ERROR_BLANK[languageCMS]}</>,
            };
        }

        const isExceedMaxLength = assignedDescription.value.length > 500;
        if (isExceedMaxLength) {
            return {
                isError: true,
                errorMessage: <>{EVENT_FORM_CMS.FORM_DESCRIPTION_ERROR_MAX_LENGTH[languageCMS]}</>,
            };
        }

        return {
            isError: false,
        };
    }

    function isDateValid(checkedDate: Date): boolean {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return checkedDate >= today;
    }

    function onSelectDate(selectedDate: Date) {
        if (isDateValid(selectedDate)) {
            setDate(selectedDate);
        } else {
            setDate(new Date());
        }
    }

    function locationValidation(): InputValidation {
        const isLocationBlank = assignedLocation.value.trim().length == 0;
        if ((locationAction.isValueChanged() || isSubmit) && isLocationBlank) {
            return {
                isError: true,
                errorMessage: <>{EVENT_FORM_CMS.FORM_LOCATION_ERROR_BLANK[languageCMS]}</>,
            };
        }

        const isExceedMaxLength = assignedLocation.value.length > 200;
        if (isExceedMaxLength) {
            return {
                isError: true,
                errorMessage: <>{EVENT_FORM_CMS.FORM_LOCATION_ERROR_MAX_LENGTH[languageCMS]}</>,
            };
        }

        return {
            isError: false,
        };
    }

    function maxAttendeeValidation(): InputValidation {
        const isMaxAttendeeBlank = assignedMaxAttendee.value.trim().length == 0;
        if (
            (maxAttendeeAction.isValueChanged() || isSubmit) &&
            isMaxAttendeeBlank
        ) {
            return {
                isError: true,
                errorMessage: <>{EVENT_FORM_CMS.FORM_MAX_ATTENDEE_ERROR_BLANK[languageCMS]}</>,
            };
        }

        const inRange =
            parseInt(assignedMaxAttendee.value) > 0 &&
            parseInt(assignedMaxAttendee.value) <= 100;
        if (maxAttendeeAction.isValueChanged() && !inRange) {
            return {
                isError: true,
                errorMessage: (
                    <>
                        {EVENT_FORM_CMS.FORM_MAX_ATTENDEE_ERROR_RANGE[languageCMS]}
                    </>
                ),
            };
        }

        const notValidEditMaxAttendee = isEditMode() && parseInt(`${assignedSelectedEvent.event?.joinedAttendee}`) > parseInt(assignedMaxAttendee.value)
        if (notValidEditMaxAttendee) {
            return {
                isError: true,
                errorMessage: (
                    <>
                        {EVENT_FORM_CMS.FORM_MAX_ATTENDEE_ERROR_JOINED[languageCMS]}
                    </>
                ),
            };
        }

        return {
            isError: false,
        };
    }

    function onExit() {
        selectedEventAction.reset();
    }

    function onCancel() {
        onExit();
        router.push(HOME_PATH);
    }

    function onSave(event: React.FormEvent<HTMLButtonElement>) {
        event.preventDefault();
        setSubmit(true);

        const isValidData =
            titleAction.isValueChanged() &&
            !titleValidation().isError &&
            descriptionAction.isValueChanged() &&
            !descriptionValidation().isError &&
            isDateValid(date) &&
            locationAction.isValueChanged() &&
            !locationValidation().isError &&
            maxAttendeeAction.isValueChanged() &&
            !maxAttendeeValidation().isError;

        if (isValidData) {
            const eventsClientService = new EventsClientService();
            const data = {
                id: assignedSelectedEvent.event?.id,
                title: assignedTitle.value,
                description: assignedDescription.value,
                location: assignedLocation.value,
                date: date.toISOString(),
                maxAttendees: parseInt(assignedMaxAttendee.value),
            }

            if (isEditMode()) {
                eventsClientService
                    .updateEvent(data)
                    .then(() => {
                        onExit();
                        router.push(HOME_PATH);
                    })
                    .catch((onerror) => {
                        console.error(onerror);
                        // display popup error
                    });
            } else {
                eventsClientService
                    .createEvent(data)
                    .then(() => {
                        onExit();
                        router.push(HOME_PATH);
                    })
                    .catch((onerror) => {
                        console.error(onerror);
                        // display popup error
                    });
            }
        }
    }

    return (
        <div className="divide-y divide-gray-900/10">
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 py-10 md:grid-cols-3">
                <div className="px-4 sm:px-0">
                    <h2 className="text-base/7 font-semibold text-gray-900">
                        {EVENT_FORM_CMS.EVENT_TITLE[languageCMS]}
                    </h2>
                    <p className="mt-1 text-sm/6 text-gray-600">
                        {EVENT_FORM_CMS.EVENT_DESCRIPTION[languageCMS]}
                    </p>
                </div>

                <form className="bg-white ring-1 shadow-xs ring-gray-900/5 sm:rounded-xl md:col-span-2">
                    <div className="px-4 py-6 sm:p-8">
                        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                                <Input
                                    label={EVENT_FORM_CMS.FORM_TITLE_LABEL[languageCMS]}
                                    rightLabel={EVENT_FORM_CMS.REQUIRED_LABEL[languageCMS]}
                                    placeholder={EVENT_FORM_CMS.FORM_TITLE_PLACEHOLDER[languageCMS]}
                                    {...assignedTitle}
                                    {...titleValidation()}
                                />
                            </div>

                            <div className="col-span-full">
                                <TextArea
                                    label={EVENT_FORM_CMS.FORM_DESCRIPTION_LABEL[languageCMS]}
                                    rightLabel={EVENT_FORM_CMS.REQUIRED_LABEL[languageCMS]}
                                    rows={5}
                                    placeholder={EVENT_FORM_CMS.FORM_DESCRIPTION_PLACEHOLDER[languageCMS]}
                                    {...assignedDescription}
                                    {...descriptionValidation()}
                                />
                            </div>

                            <div className="col-span-full relative">
                                <DatePicker
                                    label={EVENT_FORM_CMS.FORM_DATE_LABEL[languageCMS]}
                                    rightLabel={EVENT_FORM_CMS.REQUIRED_LABEL[languageCMS]}
                                    onSelectDate={onSelectDate}
                                    date={date}
                                    key={date.toISOString()}
                                    isError={!isDateValid(date)}
                                    errorMessage={isDateValid(date) ? undefined : EVENT_FORM_CMS.FORM_DATE_ERROR_PAST[languageCMS]}
                                />
                            </div>

                            <div className="col-span-full">
                                <Input
                                    label={EVENT_FORM_CMS.FORM_LOCATION_LABEL[languageCMS]}
                                    rightLabel={EVENT_FORM_CMS.REQUIRED_LABEL[languageCMS]}
                                    placeholder={EVENT_FORM_CMS.FORM_LOCATION_PLACEHOLDER[languageCMS]}
                                    {...assignedLocation}
                                    {...locationValidation()}
                                />
                            </div>

                            <div className="col-span-full">
                                <Input
                                    type="number"
                                    label={EVENT_FORM_CMS.FORM_MAX_ATTENDEE_LABEL[languageCMS]}
                                    rightLabel={EVENT_FORM_CMS.REQUIRED_LABEL[languageCMS]}
                                    min={0}
                                    max={100}
                                    placeholder="0"
                                    {...assignedMaxAttendee}
                                    {...maxAttendeeValidation()}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                        <button
                            type="button"
                            className="text-sm/6 font-semibold text-gray-900 cursor-pointer"
                            onClick={onCancel}
                        >
                            {EVENT_FORM_CMS.FORM_CANCEL_BUTTON[languageCMS]}
                        </button>
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                            onClick={onSave}
                        >
                            {EVENT_FORM_CMS.FORM_SAVE_BUTTON[languageCMS]}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
