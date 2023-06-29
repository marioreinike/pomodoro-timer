import { useContext, useState } from 'react';
import { ITimerType } from '../interfaces';
import PomodoroTimer from './PomodoroTimer';
import { AppContext } from './AppContextProvider';
import commonStyles from '../styles/Common.module.scss';
import ActionsMenu from './ActionsMenu';
import { formatSecondsToReadableString } from '../helpers/timeHelpers';

export default function PomodoroCounter() {
  const { settings, api } = useContext(AppContext);
  const [pomodoroCount, setPomodoroCount] = useState<number>(0);
  const [pomodoroElapsedTime, setPomodoroElapsedTime] = useState<number>(0);

  const handleTimerComplete = (timerType: ITimerType, elapsedTime: number): ITimerType => {
    if (timerType === 'pomodoro') {
      setPomodoroElapsedTime((prevElapsedTime) => prevElapsedTime + elapsedTime);
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
    <h3>Current Session</h3>
    <div className={commonStyles.SessionContainer}>
      <div>
        <div>Completed Pomodoros: {pomodoroCount}</div>
        <div>Pomodoro Elapsed Time: {formatSecondsToReadableString(pomodoroElapsedTime)}</div>
      </div>

      <div>
        <ActionsMenu onSaveSession={handleSaveSession} onResetSession={handleResetSession} />
      </div>
    </div>
  </>);
}
