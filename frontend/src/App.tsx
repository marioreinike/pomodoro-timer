import Home from './pages/Home';
import styles from './styles/App.module.scss';

function App() {
  return (
    <div className={styles.AppContainer}>
      <div className={styles.MainContainer}>
        <Home />
      </div>
    </div>
  );
}

export default App;
