export interface RadioGroupProps {

    label?: string;

    options: RadioOption[];

    onClick?: (option: RadioOption) => void;

}

export interface RadioOption {

    id: string;

    value: string;

    isSelected: boolean;

}