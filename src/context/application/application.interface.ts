import { LanguageCMS } from "@/cms/language-cms.type"
import { AssignedEvent, EventAction } from "@/hooks/client/event/use-event.hook"
import { AssignedSearch, SearchAction } from "@/hooks/client/search/use-search.hook"

export interface ApplicationProviderProps {

    children: React.ReactNode

}

export interface ApplicationContextType {
    search: [AssignedSearch, SearchAction],
    selectedEvent: [AssignedEvent, EventAction],
    languageCMS: LanguageCMS
}