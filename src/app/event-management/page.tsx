import EventFormWidget from "@/widgets/form/events/event-form.widget";
import FormStackedLayout from "@/components/layout/form-stacked-layout/form-stacked-layout.component";

export default function AddEventPage() {
    return (
        <>
            <FormStackedLayout>
                <EventFormWidget />
            </FormStackedLayout>
        </>
    );
}
