import { createContext, useContext } from "react";
import { DEFAULT_FORM_DATA } from "../types/constants";
import type { BacktestFormData } from "../types/orchestrator";

const FormContext = createContext<BacktestFormData>(DEFAULT_FORM_DATA);
export const FormProvider = FormContext.Provider;

export function useFormContext() {
    const formData = useContext(FormContext);
    return formData;
};
