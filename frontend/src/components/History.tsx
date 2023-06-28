import { useContext, useEffect, useState } from 'react';
import styles from '../styles/History.module.scss';
import { ISession } from '../interfaces';
import { AppContext } from './AppContextProvider';

export default function History() {
  const { api } = useContext(AppContext);
  const [sessions, setSessions] = useState<ISession[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setSessions(await api.getSessions());
      setIsLoading(false);
    })();
  }, []);

  return (<>
    <div className={styles.History}>
      <h3>History</h3>
      {isLoading ? <div>Loading...</div> : (
        <>
          {sessions.map((session) => (
            <div key={session.id}>
              <div>Completed Pomodoros: {session.pomodoroCount}</div>
              <div>Pomodoro Elapsed Time: {session.elapsedTime}</div>
            </div>
          ))}
        </>
      )}
    </div>
  </>);
}
