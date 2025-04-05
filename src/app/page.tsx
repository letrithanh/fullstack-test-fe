import SearchStackedWidget from "@/widgets/search-stacked/search-stacked.widget";
import EventsTableWidget from "@/widgets/table/events-table.widget";

export default function Home() {
    return <>
        <SearchStackedWidget>
            <EventsTableWidget />
        </SearchStackedWidget>
    </>
}
