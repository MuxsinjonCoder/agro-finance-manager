// context/LangContext.tsx
import { createContext, useContext } from "react";

interface LangContextType {
    changeLangHandler: (lang: string) => void;
}

export const LangContext = createContext<LangContextType | null>(null);

export const useLang = () => {
    const context = useContext(LangContext);
    if (!context) {
        throw new Error("useLang must be used within a LangProvider");
    }
    return context;
};
