"use client";
import InputModal from "@/components/layout/overlay/input-modal/input-modal.component";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { CLASS_JOINER } from "@/utils/class-handler";
import DateFormatter from "@/utils/date-formatter";
import { DatePickerProps } from "./date-picker.interface";

export default function DatePicker(props: DatePickerProps) {
    const INPUT_MODE = "INPUT";
    const SELECT_MODE = "SELECT";

    const [displayModal, setDisplayModal] = useState(false);

    const [date, setDate] = useState(props.date);
    const [selectedDate, setSelectedDate] = useState(props.date);
    const [mode, setMode] = useState(SELECT_MODE);
    const [inputDate, setInputDate] = useState("");

    function getRecentDaysOfLastMonth() {
        const lastDayPrevMonth = new Date(
            date.getFullYear(),
            date.getMonth(),
            0
        );

        const dayOfWeek = lastDayPrevMonth.getDay();
        const diffToMonday = (dayOfWeek + 6) % 7;

        const lastMonday = new Date(lastDayPrevMonth);
        lastMonday.setDate(lastDayPrevMonth.getDate() - diffToMonday);

        const days = [];
        const day = new Date(
            lastDayPrevMonth.getFullYear(),
            lastDayPrevMonth.getMonth(),
            lastMonday.getDate()
        );

        while (day.getMonth() === lastDayPrevMonth.getMonth()) {
            days.push(new Date(day));
            day.setDate(day.getDate() + 1);
        }

        return days.map((day) => {
            return {
                date: DateFormatter.format(day, "yyyy-MM-dd"),
                isCurrentMonth: false,
                isToday: false,
                isSelected: isSelectedDate(day),
            };
        });
    }

    function getAllDaysOfMonth() {
        const year = date.getFullYear();
        const month = date.getMonth();

        const days = [];
        const day = new Date(year, month, 1);

        while (day.getMonth() === month) {
            days.push(new Date(day));
            day.setDate(day.getDate() + 1);
        }

        return days.map((day) => {
            return {
                date: DateFormatter.format(day, "yyyy-MM-dd"),
                isCurrentMonth: true,
                isToday: isToday(day),
                isSelected: isSelectedDate(day),
            };
        });
    }

    function getRecentDaysOfNextMonth() {
        const firstDayNextMonth = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            1
        );
        const dayOfWeek = firstDayNextMonth.getDay();
        const daysToAdd = (7 - dayOfWeek) % 7;
        const nextSunday = new Date(firstDayNextMonth);
        nextSunday.setDate(firstDayNextMonth.getDate() + daysToAdd);
        const days = [];
        const day = new Date(
            firstDayNextMonth.getFullYear(),
            firstDayNextMonth.getMonth(),
            1
        );

        while (day.getDate() <= nextSunday.getDate()) {
            days.push(new Date(day));
            day.setDate(day.getDate() + 1);
        }

        return days.map((day) => {
            return {
                date: DateFormatter.format(day, "yyyy-MM-dd"),
                isCurrentMonth: false,
                isToday: false,
                isSelected: isSelectedDate(day),
            };
        });
    }

    function isToday(checkedDate: Date) {
        const today = new Date();
        return (
            checkedDate.getDate() === today.getDate() &&
            checkedDate.getMonth() === today.getMonth() &&
            checkedDate.getFullYear() === today.getFullYear()
        );
    }

    const days = [
        ...getRecentDaysOfLastMonth(),
        ...getAllDaysOfMonth(),
        ...getRecentDaysOfNextMonth(),
    ];

    function isSelectedDate(checkedDate: Date) {
        return (
            checkedDate.getDate() === selectedDate.getDate() &&
            checkedDate.getMonth() === selectedDate.getMonth() &&
            checkedDate.getFullYear() === selectedDate.getFullYear()
        );
    }

    function renderCalendar() {
        return (
            <div>
                <div className="flex items-center">
                    <h2 className="flex-auto text-sm font-semibold text-gray-900">
                        {`${date.toLocaleString("en-US", {
                            month: "long",
                        })} ${date.getFullYear()}`}
                    </h2>
                    <button
                        type="button"
                        className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 cursor-pointer"
                        onClick={() =>
                            setDate(
                                new Date(date.getFullYear(), date.getMonth(), 0)
                            )
                        }
                    >
                        <span className="sr-only">Previous month</span>
                        <ChevronLeftIcon
                            className="size-5"
                            aria-hidden="true"
                        />
                    </button>
                    <button
                        type="button"
                        className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 cursor-pointer"
                        onClick={() =>
                            setDate(
                                new Date(
                                    date.getFullYear(),
                                    date.getMonth() + 1,
                                    1
                                )
                            )
                        }
                    >
                        <span className="sr-only">Next month</span>
                        <ChevronRightIcon
                            className="size-5"
                            aria-hidden="true"
                        />
                    </button>
                </div>
                <div className="mt-10 grid grid-cols-7 text-center text-xs/6 text-gray-500">
                    <div>Mo</div>
                    <div>Tu</div>
                    <div>We</div>
                    <div>Th</div>
                    <div>Fr</div>
                    <div>Sa</div>
                    <div>Su</div>
                </div>
                <div className="mt-2 grid grid-cols-7 text-sm">
                    {days.map((day, dayIdx) => (
                        <div
                            key={day.date}
                            className={CLASS_JOINER(
                                dayIdx > 6 && "border-t border-gray-200",
                                "py-2"
                            )}
                        >
                            <button
                                type="button"
                                className={CLASS_JOINER(
                                    day.isSelected && "text-white",
                                    !day.isSelected &&
                                        day.isToday &&
                                        "text-indigo-600",
                                    !day.isSelected &&
                                        !day.isToday &&
                                        day.isCurrentMonth &&
                                        "text-gray-900",
                                    !day.isSelected &&
                                        !day.isToday &&
                                        !day.isCurrentMonth &&
                                        "text-gray-400",
                                    day.isSelected &&
                                        day.isToday &&
                                        "bg-indigo-600",
                                    day.isSelected &&
                                        !day.isToday &&
                                        "bg-gray-900",
                                    !day.isSelected && "hover:bg-gray-200",
                                    (day.isSelected || day.isToday) &&
                                        "font-semibold",
                                    "mx-auto flex size-8 items-center justify-center rounded-full cursor-pointer"
                                )}
                                onClick={() =>
                                    setSelectedDate(new Date(day.date))
                                }
                            >
                                <time dateTime={day.date}>
                                    {day.date
                                        ?.split("-")
                                        .pop()
                                        ?.replace(/^0/, "")}
                                </time>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    function formatDateInput(value: string): string {
        // Only keep digits
        const digits = value.replace(/\D/g, "");

        let year = "";
        let month = "";
        let day = "";

        if (digits.length >= 1) {
            year = digits.slice(0, 4);
        }
        if (digits.length >= 5) {
            const rawMonth = digits.slice(4, 6);
            if (rawMonth.length === 1) {
                // Auto-correct: if month starts with 0 or 1, wait for next digit
                if (["0", "1"].includes(rawMonth[0])) {
                    month = rawMonth;
                } else {
                    // Invalid first digit for month (e.g., "4") → prepend 0
                    month = "0" + rawMonth;
                }
            } else {
                const m = parseInt(rawMonth);
                if (m >= 1 && m <= 12) {
                    month = m.toString().padStart(2, "0");
                } else {
                    month = "";
                }
            }
        }

        if (digits.length >= 7) {
            const rawDay = digits.slice(6, 8);
            const m = parseInt(month || "1"); // fallback to January if month not valid
            const y = parseInt(year || "2000"); // fallback to leap year

            const maxDays = new Date(y, m, 0).getDate(); // last day of the month

            if (rawDay.length === 1) {
                if (["0", "1", "2", "3"].includes(rawDay[0])) {
                    day = rawDay;
                } else {
                    day = "0" + rawDay;
                }
            } else {
                const d = parseInt(rawDay);
                if (d >= 1 && d <= maxDays) {
                    day = d.toString().padStart(2, "0");
                } else {
                    day = "";
                }
            }
        }

        let result = year;
        if (month) result += "-" + month;
        if (day) result += "-" + day;

        return result;
    }

    function onInputDateChange(event: React.ChangeEvent<HTMLInputElement>) {
        const inputValue = formatDateInput(event.target.value)
        
        if(inputValue.length > 10) { return; }
        
        setMode(INPUT_MODE);
        setInputDate(inputValue);
    }

    function isInputDateValid(strDate: string): boolean {
        const parts = strDate.split("-");

        if (parts.length != 3) return false;

        const [year, month, day] = parts.map(Number);

        const date = new Date(strDate);

        return (
            !isNaN(date.getTime()) &&
            date.getFullYear() === year &&
            date.getMonth() + 1 === month && // JS months are 0-based
            date.getDate() === day
        );
    }

    function onPrimaryClicked() {
        setDisplayModal(false);
        if (props.onSelectDate) {
            props.onSelectDate(selectedDate);
        }
    }

    function onSecondaryClicked() {
        setDisplayModal(false);
    }

    function onCalendarIconClick() {
        setDisplayModal(true);
        setMode(SELECT_MODE);
    }

    function onInputDateBlur() {
        if (!isInputDateValid(inputDate)) {
            setInputDate(DateFormatter.format(new Date(), "yyyy-MM-dd"));
            setDate(new Date());
            if (props.onSelectDate) {
                props.onSelectDate(new Date());
            }
        } else {
            const validDate = new Date(inputDate);
            setSelectedDate(new Date(validDate))
            if (props.onSelectDate) {
                props.onSelectDate(validDate);
            }
        }
    }

    return (
        <div className="relative">
            <div className="flex justify-between">
                {/* LABEL */}
                {props.label && (
                    <>
                        {/* LEFT LABEL */}
                        <label className="block text-sm/6 font-medium text-gray-900">
                            {props.label}
                        </label>
                        {/* LEFT LABEL */}

                        {/* RIGHT LABEL */}
                        {props.rightLabel && (
                            <span className="text-sm text-gray-500">
                                {props.rightLabel}
                            </span>
                        )}
                        {/* RIGHT LABEL */}
                    </>
                )}
                {/* LABEL */}
            </div>
            <div className="mt-2 grid grid-cols-1 relative">
                <input
                    type="text"
                    placeholder="YYYY-MM-DD"
                    className={CLASS_JOINER(
                        "col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pr-10 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:pr-9 sm:text-sm/6",
                        (mode === INPUT_MODE && !isInputDateValid(inputDate)) ||props.isError ? "text-red-600 outline-red-300 focus:outline-red-600": ""
                    )}
                    value={
                        mode === SELECT_MODE
                            ? DateFormatter.format(props.date, "yyyy-MM-dd")
                            : inputDate
                    }
                    onChange={onInputDateChange}
                    onBlur={onInputDateBlur}
                    
                />
                <CalendarDaysIcon
                    aria-hidden="true"
                    className={CLASS_JOINER(
                        "col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-gray-400 sm:size-4 cursor-pointer hover:text-indigo-500",
                        props.isError ? "text-red-400" : ""
                    )}
                    onClick={onCalendarIconClick}
                />
            </div>
            {/* ERROR MESSAGE */}
            {props.errorMessage && (
                <p
                    className="mt-2 text-sm text-red-600"
                    id={`datepicker-error`}
                >
                    {props.errorMessage}
                </p>
            )}
            {/* ERROR MESSAGE */}
            <InputModal
                open={displayModal}
                onSecondary={onSecondaryClicked}
                onPrimary={onPrimaryClicked}
                textPrimary="Select"
                textSecondary="Cancel"
            >
                {renderCalendar()}
            </InputModal>
        </div>
    );
}
