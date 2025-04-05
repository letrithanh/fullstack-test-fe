"use client"

import { createContext } from "react";
import { ApplicationContextType, ApplicationProviderProps } from "./application.interface";
import { useSearch } from "@/hooks/client/search/use-search.hook";

export const ApplicationContext = createContext<ApplicationContextType>({} as ApplicationContextType);

const ApplicationProvider = (props: ApplicationProviderProps) => {

    const search = useSearch("");

    return (
        <ApplicationContext.Provider 
            value={{
                search
            }}>
            {props.children}
        </ApplicationContext.Provider>
    )
};

export default ApplicationProvider;