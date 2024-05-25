import { createContext, ReactNode, useMemo } from "react";
import { GlobalContextType } from "../interfaces/GlobalContext";

export const GlobalContext = createContext<GlobalContextType>({});

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const valueObj: GlobalContextType = useMemo(() => ({}), []);
  return (
    <GlobalContext.Provider value={valueObj}>{children}</GlobalContext.Provider>
  );
};
