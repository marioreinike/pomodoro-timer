import { useContext, useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, IconButton, TextField } from '@mui/material';
import { AppContext, SettingsDispatchContext } from './AppContextProvider';
import styles from '../styles/Settings.module.scss';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

export default function Settings() {
  const { settings: { times, longBreakInterval } } = useContext(AppContext);
  const settingsDispatch = useContext(SettingsDispatchContext);

  const [open, setOpen] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(Math.floor(times.pomodoro / 60));
  const [shortBreakTime, setShortBreakTime] = useState(Math.floor(times.shortBreak / 60));
  const [longBreakTime, setLongBreakTime] = useState(Math.floor(times.longBreak / 60));
  const [longBreakIntervalTime, setLongBreakIntervalTime] = useState(longBreakInterval);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    setOpen(false);
    settingsDispatch({
      type: 'set',
      payload: {
        times: {
          pomodoro: pomodoroTime * 60,
          shortBreak: shortBreakTime * 60,
          longBreak: longBreakTime * 60,
        },
        longBreakInterval: longBreakIntervalTime,
      },
    });
  };

  return (
    <div>
      <IconButton onClick={handleOpen}><SettingsIcon /></IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={styles.SettingsModal}>
            <h3>Settings</h3>
            <TextField
              label='Pomodoro Time'
              type='number'
              value={pomodoroTime}
              onChange={(e) => setPomodoroTime(parseInt(e.target.value, 10))}
            />
            <TextField
              label='Short Break Time'
              type='number'
              value={shortBreakTime}
              onChange={(e) => setShortBreakTime(parseInt(e.target.value, 10))}
            />
            <TextField
              label='Long Break Time'
              type='number'
              value={longBreakTime}
              onChange={(e) => setLongBreakTime(parseInt(e.target.value, 10))}
            />
            <TextField
              label='Long Break Interval'
              type='number'
              value={longBreakIntervalTime}
              onChange={(e) => setLongBreakIntervalTime(parseInt(e.target.value, 10))}
            />
            <div className={styles.SettingsButtons}>
              <Button variant='contained' onClick={handleSave}>Save</Button>
              <Button variant='contained' color='info' onClick={handleClose}>Cancel</Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
