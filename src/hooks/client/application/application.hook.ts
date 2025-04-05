import { ApplicationContext } from "@/context/application/application.context";
import { ApplicationContextType } from "@/context/application/application.interface";
import { useContext } from "react";

export const useApplication = () => useContext<ApplicationContextType>(ApplicationContext);