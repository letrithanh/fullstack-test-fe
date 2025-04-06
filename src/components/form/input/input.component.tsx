import React from "react";
import { InputProps } from "./input.interface";
import ExclamationCircleIcon from "@heroicons/react/24/outline/ExclamationCircleIcon";

const Input = (props: InputProps) => {
    const customInputFieldClassName = props.customInputFieldClassName
        ? props.customInputFieldClassName
        : "";

    const onValidInputRendered = () => {
        return (
            <>
                {/* VALID */}
                <div className="mt-1">
                    <input
                        type={props.type}
                        name={props.name}
                        id={props.id}
                        className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${customInputFieldClassName}`}
                        placeholder={props.placeholder}
                        onChange={props.onChange}
                        value={props.value}
                        disabled={props.disabled}
                        min={props.min}
                        max={props.max}
                    />
                    
                </div>

                {/* DESCRIPTION */}
                {props.description && (
                    <p className="mt-2 text-sm text-gray-500">
                        {props.description}
                    </p>
                )}
                {/* DESCRIPTION */}
                {/* VALID */}
            </>
        );
    };

    const onInvalidInputRendered = () => {
        return (
            <>
                {/* INVALID */}
                <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                        type={props.type}
                        name={props.name}
                        id={props.id}
                        className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-red-900 outline-1 -outline-offset-1 outline-red-300 placeholder:text-red-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6 ${customInputFieldClassName}`}
                        placeholder={props.placeholder}
                        aria-invalid="true"
                        aria-describedby={`${props.name}-${props.id}-error`}
                        onChange={props.onChange}
                        value={props.value}
                        disabled={props.disabled}
                        min={props.min}
                        max={props.max}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ExclamationCircleIcon
                            className="h-5 w-5 text-red-500"
                            aria-hidden="true"
                        />
                    </div>
                </div>
                {/* ERROR MESSAGE */}
                {props.errorMessage && (
                    <p
                        className="mt-2 text-sm text-red-600"
                        id={`${props.name}-${props.id}-error`}
                    >
                        {props.errorMessage}
                    </p>
                )}
                {/* ERROR MESSAGE */}
                {/* INVALID */}
            </>
        );
    };

    const inputRendered = () => {
        return props.isError
            ? onInvalidInputRendered()
            : onValidInputRendered();
    };

    return (
        <div>
            <div className="flex justify-between">
                {/* LABEL */}
                {props.label && (
                    <>
                        {/* LEFT LABEL */}
                        <label
                            htmlFor={props.name}
                            className="block text-sm font-medium text-gray-700"
                        >
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

            {/* RENDER INPUT SECTION BASED ON ERROR STATUS */}
            {inputRendered()}
            {/* RENDER INPUT SECTION BASED ON ERROR STATUS */}
        </div>
    );
};

export default Input;
