import React from 'react';
import { ITimerSettings } from '../interfaces';
import Api from '../lib/api';

interface AppConstextType {
  settings: ITimerSettings;
  api: Api;
}

const defaultSettings = {
  times: {
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  },
  longBreakInterval: 4,
};

const api = new Api();

export const AppContext = React.createContext<AppConstextType>({ settings: defaultSettings, api });

interface AppContextProviderProps {
  children: JSX.Element | JSX.Element[];
}

export default function AppContextProvider({ children }: AppContextProviderProps) {
  return (
    <AppContext.Provider value={{ settings: defaultSettings, api }}>
      {children}
    </AppContext.Provider>
  );
}
