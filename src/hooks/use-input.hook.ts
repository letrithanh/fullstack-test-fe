import { useState } from "react"

export interface AssignedInput {
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export interface InputAction {
    reset: () => void,
    isValueChanged: () => boolean,
    update: (updatedValue: string) => void
}

export interface UseInputState {
    value: string,
    valueChanged: boolean
}

export const useInput = (initializeValue: string): [AssignedInput, InputAction] => {

    const [inputState, setInputState] = useState<UseInputState>({
        value: initializeValue,
        valueChanged: false,
    });

    return [
        {
            value: inputState.value,
            onChange: e => {
                setInputState({
                    value: e.target.value,
                    valueChanged: true
                });
            },
        },
        {
            reset: () => {
                setInputState({
                    value: initializeValue,
                    valueChanged: false
                });
            },
            isValueChanged: (): boolean => {
                return inputState.valueChanged;
            },
            update: (updateValue) => {
                setInputState({
                    value: updateValue,
                    valueChanged: true
                });
            }
        }
    ];
};