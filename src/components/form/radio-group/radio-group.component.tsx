import { RadioGroupProps, RadioOption } from "./radio-group.interface";

export default function RadioGroup(props: RadioGroupProps) {

    function onClick(option: RadioOption) {
        if (props.onClick) {
            props.onClick(option)
        }
    }

    return (
        <fieldset>
            {
                props.label &&
                <legend className="text-sm/6 font-semibold text-gray-900">
                    {props.label}
                </legend>
            }
            <div className="mt-1 space-y-2">
                {props.options.map((option) => (
                    <div
                        key={option.id}
                        className="flex items-center"
                    >
                        <input
                            defaultChecked={option.isSelected}
                            id={option.id}
                            name="notification-method"
                            type="radio"
                            className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                            onClick={() => onClick(option)}
                        />
                        <label
                            htmlFor={option.id}
                            className="ml-3 block text-sm/6 font-medium text-gray-900"
                        >
                            {option.value}
                        </label>
                    </div>
                ))}
            </div>
        </fieldset>
    );
}
