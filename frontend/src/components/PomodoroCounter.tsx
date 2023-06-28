import { useContext, useState } from 'react';
import { Button } from '@mui/material';
import { ITimerType } from '../interfaces';
import PomodoroTimer from './PomodoroTimer';
import { AppContext } from './AppContextProvider';
import styles from '../styles/PomodoroCounter.module.scss';

export default function PomodoroCounter() {
  const { settings, api } = useContext(AppContext);
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

  const handleSaveSession = async () => {
    await api.createSession({ pomodoroCount, elapsedTime: pomodoroElapsedTime });
  };

  const handleResetSession = () => {
    setPomodoroCount(0);
    setPomodoroElapsedTime(0);
  };

  return (<>
    <PomodoroTimer onTimerComplete={handleTimerComplete} />
    <div className={styles.PomodoroSession}>
      <div>
        <h3>Current Session</h3>
        <div>Completed Pomodoros: {pomodoroCount}</div>
        <div>Pomodoro Elapsed Time: {pomodoroElapsedTime}</div>
      </div>

      <div>
        <Button variant="contained" onClick={handleSaveSession}>Save Session</Button>
        <Button variant="contained" color='info' onClick={handleResetSession}>Reset Session</Button>
      </div>
    </div>
  </>);
}
