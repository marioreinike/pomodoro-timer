import { IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import PomodoroTimer from '../components/PomodoroTimer';
import styles from '../styles/Home.module.scss';
import History from '../components/History';
import { ITimerSettings } from '../interfaces/ITimerSettings';

const defaultSettings: ITimerSettings = {
  times: {
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  },
  longBreakInterval: 4,
};

export default function Home() {
  const [settings, setSettings] = useState<ITimerSettings>(defaultSettings);

  return (<>
    <div className={styles.Navbar}>
      <div className={styles.HeaderTitle}>Pomodoro Timer</div>
      <div className={styles.Spacing}></div>
      <div className={styles.HeaderButton}><IconButton><SettingsIcon /></IconButton></div>
      <div className={styles.HeaderButton}><IconButton><AccountCircleIcon /></IconButton></div>
    </div>
    <PomodoroTimer settings={settings} />
    <History />
  </>);
}
