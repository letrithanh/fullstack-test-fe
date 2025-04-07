"use client";

import SearchStackedLayout from "@/components/layout/search-stacked-layout/search-stacked-layout.component";
import { SearchStackedWidgetProps } from "./search-stacked-widget.interface";
import { useApplication } from "@/hooks/client/application/application.hook";
import { SEARCH_STACKED_CMS } from "@/cms/search-stacked/search-stacked.cms";

export default function SearchStackedWidget(props: SearchStackedWidgetProps) {
    const {
        search: [, searchAction],
        languageCMS
    } = useApplication();

    function onSearchChanged(text: string) {
        searchAction.update(text)
    }

    return (
        <SearchStackedLayout
            onSearchChanged={onSearchChanged}
            label={SEARCH_STACKED_CMS.SEARCH_LABEL[languageCMS]}
        >
            {props.children}
        </SearchStackedLayout>
    );
}
