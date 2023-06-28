import { IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styles from '../styles/Home.module.scss';
import History from '../components/History';
import PomodoroCounter from '../components/PomodoroCounter';
import AppContextProvider from '../components/AppContextProvider';

export default function Home() {
  return (<>
    <AppContextProvider>
      <div className={styles.Navbar}>
        <div className={styles.HeaderTitle}>Pomodoro Timer</div>
        <div className={styles.Spacing}></div>
        <div className={styles.HeaderButton}><IconButton><SettingsIcon /></IconButton></div>
        <div className={styles.HeaderButton}><IconButton><AccountCircleIcon /></IconButton></div>
      </div>

      <PomodoroCounter />

      <History />
    </AppContextProvider>
  </>);
}
