"use client";
import Input from "@/components/form/input/input.component";
import RadioGroup from "@/components/form/radio-group/radio-group.component";
import { RadioOption } from "@/components/form/radio-group/radio-group.interface";
import FormStackedLayout from "@/components/layout/form-stacked-layout/form-stacked-layout.component";
import InputModal from "@/components/layout/overlay/input-modal/input-modal.component";
import { EventsClientService } from "@/control/events/events-service.client";
import { Attendee } from "@/entity/attendee/attendee.entity";
import { useApplication } from "@/hooks/client/application/application.hook";
import InputValidation from "@/hooks/input-validation.interface";
import { useInput } from "@/hooks/use-input.hook";
import { EVENT_MANAGEMENT_PATH, HOME_PATH } from "@/utils/application-path";
import { CLASS_JOINER } from "@/utils/class-handler";
import DateFormatter from "@/utils/date-formatter";
import {
    ArrowLeftIcon,
    CalendarDateRangeIcon,
    ExclamationTriangleIcon,
    MapPinIcon,
    UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EventDetailWidget() {
    const MALE = "MALE";
    const FEMALE = "FEMALE";

    const {
        selectedEvent: [assignedSelectedEvent, selectedEventAction],
    } = useApplication();

    const router = useRouter();

    const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
    const [displayRegisterModal, setDisplayRegisterModal] = useState(false);

    const [isSubmit, setSubmit] = useState(false);
    const [assignedFullname, fullnameAction] = useInput("");
    const [gender, setGender] = useState(MALE);
    const [assignedEmail, emailAction] = useInput("");
    const [assignedPhone, phoneAction] = useInput("");
    const [attendeeErrorMessage, setAttendeeErrorMessage] = useState("");

    useEffect(() => {
        if (assignedSelectedEvent.event == null) {
            router.push(HOME_PATH);
        }
    }, []);

    function onExit() {
        selectedEventAction.reset();
        router.push(HOME_PATH);
    }

    function onEdit() {
        router.push(EVENT_MANAGEMENT_PATH);
    }

    function onDeleteClick() {
        setDisplayDeleteModal(true);
    }

    function onCancelDeleteModalClick() {
        setDisplayDeleteModal(false);
    }

    function onConfirmDeleteModalClick() {
        setDisplayDeleteModal(false);
        const eventsClientService = new EventsClientService();
        eventsClientService
            .deleteEvent(`${assignedSelectedEvent.event?.id}`)
            .then(() => {
                selectedEventAction.reset();
                router.push(HOME_PATH);
            })
            .catch((onerror) => console.error(onerror));
    }

    function fullnameValidation(): InputValidation {
        const isFullnameBlank = assignedFullname.value.trim().length == 0;
        if ((fullnameAction.isValueChanged() || isSubmit) && isFullnameBlank) {
            return {
                isError: true,
                errorMessage: <>Full name must have value</>,
            };
        }

        const isExceedMaxLength = assignedFullname.value.length > 20;
        if (isExceedMaxLength) {
            return {
                isError: true,
                errorMessage: <>Max length is 20 characters</>,
            };
        }

        return {
            isError: false,
        };
    }

    function onGenderClick(option: RadioOption) {
        setGender(option.id);
    }

    function emailValidation(): InputValidation {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (
            (emailAction.isValueChanged() || isSubmit) &&
            !emailRegex.test(assignedEmail.value)
        ) {
            return {
                isError: true,
                errorMessage: <>Invalid email</>,
            };
        }

        return {
            isError: false,
        };
    }

    function phoneValidation(): InputValidation {
        const phoneRegex = /^0\d{9}$/;
        if (
            (phoneAction.isValueChanged() || isSubmit) &&
            !phoneRegex.test(assignedPhone.value)
        ) {
            return {
                isError: true,
                errorMessage: <>Invalid phone number</>,
            };
        }

        return {
            isError: false,
        };
    }

    function notValidRegister(): boolean {
        return (
            parseInt(`${assignedSelectedEvent.event?.joinedAttendee}`) >=
            parseInt(`${assignedSelectedEvent.event?.maxAttendees}`)
        );
    }

    function onRegisterClick() {
        setDisplayRegisterModal(true);
    }

    function onReset() {
        fullnameAction.reset();
        setGender(MALE);
        emailAction.reset();
        phoneAction.reset();
        setSubmit(false);
    }

    function onCancelRegisterClick() {
        setDisplayRegisterModal(false);
        onReset();
    }

    function onConfirmRegisterClick() {
        setSubmit(true);

        const isValidData =
            fullnameAction.isValueChanged() &&
            !fullnameValidation().isError &&
            gender != null &&
            emailAction.isValueChanged() &&
            !emailValidation().isError &&
            phoneAction.isValueChanged() &&
            !phoneValidation().isError;

        if (isValidData) {
            const data: Attendee = {
                name: assignedFullname.value,
                gender,
                email: assignedEmail.value,
                phone: assignedPhone.value,
            };

            const eventsClientService = new EventsClientService();
            eventsClientService
                .register(`${assignedSelectedEvent.event?.id}`, data)
                .then(() => {
                    onReset();
                    setDisplayRegisterModal(false);
                    selectedEventAction.update({
                        ...assignedSelectedEvent.event!,
                        joinedAttendee:
                            assignedSelectedEvent.event!.joinedAttendee! + 1,
                    });
                })
                .catch((onerror) => {
                    setAttendeeErrorMessage(onerror.message);
                });
        }
    }

    return (
        <>
            <FormStackedLayout>
                <div className="md:flex md:items-center md:justify-between">
                    <div className="min-w-0 flex-1">
                        <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight flex items-center gap-4">
                            <ArrowLeftIcon
                                className="h-8 w-8 cursor-pointer"
                                onClick={onExit}
                            />
                            {assignedSelectedEvent.event?.title}
                        </h2>
                    </div>
                    <div className="mt-4 flex md:mt-0 md:ml-4">
                        <button
                            type="button"
                            className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs ring-red-100 ring-inset hover:bg-red-700 cursor-pointer"
                            onClick={onDeleteClick}
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
                        <div>{assignedSelectedEvent.event?.description}</div>
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
                                    {DateFormatter.format(
                                        new Date(
                                            assignedSelectedEvent.event?.date ||
                                                new Date()
                                        ),
                                        "dd-MM-yyyy"
                                    )}
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
                        className={CLASS_JOINER(
                            "w-full grid place-items-center items-center rounded-md  px-3 py-2 text-sm font-semibold  shadow-xs  focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer",
                            notValidRegister()
                                ? "bg-gray-200 text-gray-500"
                                : "bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:outline-indigo-600"
                        )}
                        onClick={onRegisterClick}
                        disabled={notValidRegister()}
                    >
                        Register
                    </button>
                </div>
            </FormStackedLayout>

            {/* DELETE MODAL */}
            <InputModal
                open={displayDeleteModal}
                textPrimary={"Delete"}
                textSecondary={"Cancel"}
                primaryClassName="text-white shadow-xs ring-red-100 ring-inset bg-red-600 hover:bg-red-700"
                onSecondary={onCancelDeleteModalClick}
                onPrimary={onConfirmDeleteModalClick}
            >
                <div className="flex flex-col w-full items-center">
                    <ExclamationTriangleIcon
                        aria-hidden="true"
                        className="size-16 text-red-600"
                    />
                    <div className="font-semibold">
                        Are you sure to delete this event?
                    </div>
                </div>
            </InputModal>
            {/* DELETE MODAL */}

            {/* REGISTER MODAL */}
            <InputModal
                open={displayRegisterModal}
                textPrimary={"Confirm"}
                textSecondary={"Cancel"}
                onSecondary={onCancelRegisterClick}
                onPrimary={onConfirmRegisterClick}
            >
                <div className="grid max-w-2xl grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
                    <div className="col-span-full">
                        <Input
                            label="Full Name"
                            rightLabel="required"
                            placeholder="Your's full name"
                            {...assignedFullname}
                            {...fullnameValidation()}
                        />
                    </div>
                    <div className="col-span-full">
                        <RadioGroup
                            label="Gender"
                            options={[
                                {
                                    id: MALE,
                                    value: "Male",
                                    isSelected: gender == MALE,
                                },
                                {
                                    id: FEMALE,
                                    value: "Female",
                                    isSelected: gender == FEMALE,
                                },
                            ]}
                            onClick={onGenderClick}
                        />
                    </div>
                    <div className="col-span-full">
                        <Input
                            label="Email"
                            rightLabel="required"
                            placeholder="email@example.com"
                            {...assignedEmail}
                            {...emailValidation()}
                        />
                    </div>
                    <div className="col-span-full">
                        <Input
                            label="Phone"
                            rightLabel="required"
                            placeholder="09xxxxxxxx"
                            {...assignedPhone}
                            {...phoneValidation()}
                        />
                    </div>
                    {attendeeErrorMessage.trim().length > 0 && (
                        <div className="col-span-full">
                            <p
                                className="mt-2 text-sm text-red-600"
                            >
                                {attendeeErrorMessage}
                            </p>
                        </div>
                    )}
                </div>
            </InputModal>
            {/* REGISTER MODAL */}
        </>
    );
}
