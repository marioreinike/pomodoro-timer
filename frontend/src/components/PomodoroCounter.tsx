import { useContext, useState } from 'react';
import { ITimerType } from '../interfaces';
import PomodoroTimer from './PomodoroTimer';
import { AppContext } from './AppContextProvider';

export default function PomodoroCounter() {
  const { settings } = useContext(AppContext);
  const [pomodoroCount, setPomodoroCount] = useState<number>(0);
  const [pomodoroElapsedTime, setPomodoroElapsedTime] = useState<number>(0);

  const handleTimerComplete = (timerType: ITimerType, elapsedTime: number): ITimerType => {
    if (timerType === 'pomodoro') {
      setPomodoroElapsedTime(elapsedTime);
      const newPomodoroCount = pomodoroCount + 1;
      setPomodoroCount(newPomodoroCount);
      if (newPomodoroCount % settings.longBreakInterval === 0) {
        return 'longBreak';
      }
      return 'shortBreak';
    }
    return 'pomodoro';
  };

  return (<>
    <PomodoroTimer onTimerComplete={handleTimerComplete} />
    <div>
      <div>Completed Pomodoros: {pomodoroCount}</div>
      <div>Pomodoro Elapsed Time: {pomodoroElapsedTime}</div>
    </div>
  </>);
}
