import { createContext, ReactNode } from 'react';

export interface IGlobalContext {
  subscription: object;
}

const defaultValue: IGlobalContext = {
  subscription: {},
};

const GlobalContext = createContext<IGlobalContext>(defaultValue);

export const GlobalProvider: React.FC<{
  children: ReactNode;
  subscription: object;
}> = ({ children, subscription }) => {
  return (
    <GlobalContext.Provider value={{ subscription }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
