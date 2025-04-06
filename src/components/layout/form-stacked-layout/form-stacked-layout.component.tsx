import { FormStackedLayoutProps } from "./form-stacked-layout.interface";

export default function FormStackedLayout(props: FormStackedLayoutProps) {

    return (
        <>
            <div className="min-h-full">
                <div className="bg-gray-800 pb-32">
                    <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                    </div>
                </div>

                <main className="-mt-16">
                    <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
                        <div className="rounded-lg bg-gray-50 px-5 py-6 shadow-sm sm:px-6">
                            {props.children}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
