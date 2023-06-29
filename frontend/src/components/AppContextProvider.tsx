import {
  Dispatch, createContext, useEffect, useReducer,
} from 'react';
import { ITimerSettings } from '../interfaces';
import Api from '../lib/api';
import settingsReducer from '../reducers/settingsReducer';

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

export const AppContext = createContext<AppConstextType>({ settings: defaultSettings, api });
// eslint-disable-next-line
export const SettingsDispatchContext = createContext<Dispatch<{ type: string, payload: Partial<ITimerSettings> }>>(() => {});

interface AppContextProviderProps {
  children: JSX.Element | JSX.Element[];
}

export default function AppContextProvider({ children }: AppContextProviderProps) {
  const [settings, dispatch] = useReducer(settingsReducer, defaultSettings);

  useEffect(() => {
    console.log(settings);
  }, [settings]);

  return (
    <AppContext.Provider value={{ settings, api }}>
      <SettingsDispatchContext.Provider value={dispatch}>
        {children}
      </SettingsDispatchContext.Provider>
    </AppContext.Provider>
  );
}
