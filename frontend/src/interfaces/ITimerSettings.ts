export interface ITimerSettings {
  times: {
    pomodoro: number;
    shortBreak: number;
    longBreak: number;
  };
  longBreakInterval: number;
}
