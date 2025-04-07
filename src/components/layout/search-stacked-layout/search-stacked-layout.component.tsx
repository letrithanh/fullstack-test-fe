import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { SearchStackedLayoutProps } from "./search-stacked-layout.interface";

export default function SearchStackedLayout(props: SearchStackedLayoutProps) {

    function onSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
        props.onSearchChanged(event.target.value);
    }

    return (
        <>
            <div className="min-h-full">
                <div className="bg-gray-800 pb-32">
                    <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between lg:border-b lg:border-gray-400/25 flex-col">
                            <div className="font-semibold text-white py-4 text-xl">Search</div>
                            <div className="grid w-full grid-cols-1">
                                <input
                                    name="search"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                    className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pr-3 pl-10 text-base text-gray-900 outline-hidden placeholder:text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-white/40 sm:text-sm/6"
                                    onChange={onSearchChange}
                                    autoComplete="none"
                                />
                                <MagnifyingGlassIcon
                                    aria-hidden="true"
                                    className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <main className="-mt-16">
                    <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
                        <div className="rounded-lg bg-white px-5 py-6 shadow-sm sm:px-6">
                            {props.children}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
