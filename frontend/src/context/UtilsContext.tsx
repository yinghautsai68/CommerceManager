import React, { createContext } from "react";

type UtilsContextType = {
    formatDate: (date: string) => string;
}

export const UtilsContext = createContext<UtilsContextType>({
    formatDate: () => ""
})

export const UtilsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const formatDate = (date: string) => {
        return date.slice(0, 16).replace("T", " ").replace(/-/g, "/");
    };

    return (
        <UtilsContext.Provider value={{ formatDate }}>
            {children}
        </UtilsContext.Provider>
    )

}

