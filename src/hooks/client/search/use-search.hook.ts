import { useState } from "react"

export interface AssignedSearch {
    value: string
}

export interface SearchAction {
    reset: () => void,
    isValueChanged: () => boolean,
    update: (updatedValue: string) => void
}

export interface UseSearchState {
    value: string,
    valueChanged: boolean
}

export const useSearch = (initializeValue: string): [AssignedSearch, SearchAction] => {

    const [searchState, setSearchState] = useState<UseSearchState>({
        value: initializeValue,
        valueChanged: false,
    });

    return [
        {
            value: searchState.value
        },
        {
            reset: () => {
                setSearchState({
                    value: initializeValue,
                    valueChanged: false
                });
            },
            isValueChanged: (): boolean => {
                return searchState.valueChanged;
            },
            update: (updateValue) => {
                setSearchState({
                    value: updateValue,
                    valueChanged: true
                });
            }
        }
    ];
};