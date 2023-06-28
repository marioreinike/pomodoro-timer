import React from 'react';
import { ITimerSettings } from '../interfaces/ITimerSettings';

interface AppConstextType {
  settings: ITimerSettings;
}

const defaultSettings = {
  times: {
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  },
  longBreakInterval: 4,
};

export const AppContext = React.createContext<AppConstextType>({ settings: defaultSettings });

interface AppContextProviderProps {
  children: JSX.Element | JSX.Element[];
}

export default function AppContextProvider({ children }: AppContextProviderProps) {
  return (
    <AppContext.Provider value={{ settings: defaultSettings }}>
      {children}
    </AppContext.Provider>
  );
}
