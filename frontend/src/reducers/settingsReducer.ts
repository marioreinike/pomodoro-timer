import { ITimerSettings } from '../interfaces';

export default function settingsReducer(
  settings: ITimerSettings,
  action: { type: string; payload: Partial<ITimerSettings> },
) {
  switch (action.type) {
    case 'set':
      return {
        ...settings,
        ...action.payload,
      };
    default:
      return settings;
  }
}
