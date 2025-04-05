"use client";

import SearchStackedLayout from "@/components/layout/search-stacked-layout/search-stacked-layout.component";
import { SearchStackedWidgetProps } from "./search-stacked-widget.interface";
import { useApplication } from "@/hooks/client/application/application.hook";

export default function SearchStackedWidget(props: SearchStackedWidgetProps) {
    const {
        search: [, searchAction],
    } = useApplication();

    function onSearchChanged(text: string) {
        searchAction.update(text)
    }

    return (
        <SearchStackedLayout onSearchChanged={onSearchChanged}>
            {props.children}
        </SearchStackedLayout>
    );
}
