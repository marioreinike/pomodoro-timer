import { useState } from 'react';
import { Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { ITImerType } from '../interfaces';
import styles from '../styles/PomodoroTimer.module.scss';
import CircularProgress from './CircularProgress';
import { formatSecondstoString } from '../helpers/timeHelpers';
import { ITimerSettings } from '../interfaces/ITimerSettings';

interface TimerProps {
  settings: ITimerSettings;
}

export default function PomodoroTimer(props: TimerProps) {
  const { settings: { times } } = props;
  const [timerType, setTimerType] = useState<ITImerType>('pomodoro');
  const [timerValue, setTimerValue] = useState<number>(times.pomodoro);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
  const remainingPercent = (timerValue / times[timerType]) * 100;
  const [pomodoroElapsedTime, setPomodoroElapsedTime] = useState<number>(0);
  const [pomodoroCount, setPomodoroCount] = useState<number>(1);
  const elapsedTime = times[timerType] - timerValue;

  const handleTimerTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newTimerType: ITImerType,
  ) => {
    setTimerType(newTimerType);
    resetTimer();
  };

  const tick = () => {
    setTimerValue((prevTimerValue) => prevTimerValue - 1);
    if (timerType === 'pomodoro') {
      setPomodoroElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
    }
  };

  const startTimer = () => {
    setTimerRunning(true);
    setTimerInterval(setInterval(tick, 1000));
  };

  const pauseTimer = () => {
    setTimerRunning(false);
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  };

  const resetTimer = () => {
    pauseTimer();
    setTimerValue(times[timerType]);
  };

  return (
  <div className={styles.TimerContainer}>
    <div className={styles.TimerTabs}>
      <ToggleButtonGroup
        color="primary"
        value={timerType}
        exclusive
        onChange={handleTimerTypeChange}
        aria-label="Platform"
      >
        <ToggleButton value="pomodoro">Pomodoro</ToggleButton>
        <ToggleButton value="shortBreak">Short Break</ToggleButton>
        <ToggleButton value="longBreak">Long Break</ToggleButton>
      </ToggleButtonGroup>
    </div>

    <div className={styles.Timer}>
      <CircularProgress
        size={250}
        strokeWidth={10}
        progress={remainingPercent}
        text={`${formatSecondstoString(timerValue)}`}
      />
    </div>

    <div className={styles.TimerButtons}>
      {timerRunning ? (
        <Button className={styles.TimerButton} variant="contained" onClick={pauseTimer}>Pause</Button>
      ) : (
        <Button className={styles.TimerButton} variant="contained" onClick={startTimer}>Start</Button>
      )
      }
      {elapsedTime > 0 && (
        <Button className={styles.TimerButton} variant="contained" color='primary' onClick={resetTimer}>Reset</Button>
      )}
    </div>
  </div>
  );
}
