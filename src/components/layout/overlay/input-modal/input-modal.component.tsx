"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { InputModalProps } from "./input-modal.interface";

export default function InputModal(props: InputModalProps) {

    function onClose(value: boolean) {
        if (props.onClose) {
            props.onClose(value);
        }
    }

    function onPrimaryClicked() {
        if (props.onPrimary) {
            props.onPrimary();
        }
    }

    function onSecondaryClicked() {
        if (props.onSecondary) {
            props.onSecondary();
        }
    }

    return (
        <Dialog open={props.open} onClose={onClose} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                        <div>
                            {props.children}
                        </div>
                        <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                            <button
                                type="button"
                                onClick={onPrimaryClicked}
                                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2 cursor-pointer"
                            >
                                {props.textPrimary}
                            </button>
                            <button
                                type="button"
                                data-autofocus
                                onClick={onSecondaryClicked}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:col-start-1 sm:mt-0 cursor-pointer"
                            >
                                {props.textSecondary}
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}
