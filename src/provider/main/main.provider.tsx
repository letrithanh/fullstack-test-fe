"use client";

import ApplicationProvider from "@/context/application/application.context";
import { MainProviderProps } from "./main-provider.interface";

const MainProvider = (props: MainProviderProps) => {
    return <ApplicationProvider>{props.children}</ApplicationProvider>;
};

export default MainProvider;
