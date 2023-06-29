import { useContext, useEffect, useState } from 'react';
import {
  Button, IconButton, ToggleButton, ToggleButtonGroup,
} from '@mui/material';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { ITimerType } from '../interfaces';
import styles from '../styles/PomodoroTimer.module.scss';
import CircularProgress from './CircularProgress';
import { formatSecondstoString } from '../helpers/timeHelpers';
import { confirm } from '../helpers/confirm';
import { AppContext } from './AppContextProvider';

interface TimerProps {
  onTimerComplete: (timerTime: ITimerType, elapsedTime: number) => ITimerType;
}

export default function PomodoroTimer({ onTimerComplete }: TimerProps) {
  const { settings: { times, longBreakInterval } } = useContext(AppContext);
  const [timerType, setTimerType] = useState<ITimerType>('pomodoro');
  const [timerValue, setTimerValue] = useState<number>(times.pomodoro);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
  const remainingPercent = (timerValue / times[timerType]) * 100;
  const elapsedTime = times[timerType] - timerValue;

  useEffect(() => {
    resetTimer({ force: true });
  }, [times, longBreakInterval]);

  const handleTimerTypeChange = async (
    event: React.MouseEvent<HTMLElement> | null,
    newTimerType: ITimerType,
  ) => {
    if (newTimerType === null) {
      return;
    }
    if (await resetTimer({ newTimerType })) {
      setTimerType(newTimerType);
    }
  };

  const handleTimerComplete = () => {
    const newTimerType = onTimerComplete(timerType, elapsedTime);
    handleTimerTypeChange(null, newTimerType);
  };

  const tick = () => {
    setTimerValue((prevTimerValue) => prevTimerValue - 1);
    if (timerValue < 0) {
      handleTimerComplete();
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

  const resetTimer = async (
    options: { newTimerType?: ITimerType, force?: boolean } = {},
  ): Promise<boolean> => {
    const { newTimerType, force = false } = options;
    const skipConfirmation = !timerRunning && elapsedTime === 0;
    const confirmed = force || skipConfirmation || await confirm('This will reset the timer.');
    if (!confirmed) {
      return false;
    }
    const timerTypeToUse = newTimerType || timerType;
    pauseTimer();
    setTimerValue(times[timerTypeToUse]);
    return true;
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
      {(timerRunning || elapsedTime > 0) && (<>
        <IconButton className={styles.TimerButton} onClick={handleTimerComplete}>
          <SkipNextIcon />
        </IconButton>
      </>)}
    </div>
  </div>
  );
}
