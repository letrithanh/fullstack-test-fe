"use client"

import { createContext } from "react";
import { ApplicationContextType, ApplicationProviderProps } from "./application.interface";
import { useSearch } from "@/hooks/client/search/use-search.hook";
import { useEvent } from "@/hooks/client/event/use-event.hook";

export const ApplicationContext = createContext<ApplicationContextType>({} as ApplicationContextType);

const ApplicationProvider = (props: ApplicationProviderProps) => {

    const search = useSearch("");
    const selectedEvent = useEvent();
    const languageCMS = "vn";

    return (
        <ApplicationContext.Provider 
            value={{
                search,
                selectedEvent,
                languageCMS
            }}>
            {props.children}
        </ApplicationContext.Provider>
    )
};

export default ApplicationProvider;