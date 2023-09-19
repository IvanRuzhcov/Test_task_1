import style from './style.module.css';
import DocumentSearch from '../DocumentSearch/DocumentSearch';

function App() {
  return (
    <div>
      <div className={style.up_text}>
        <h1>MyApp</h1>
        <p>username</p>
      </div>
      <div className={style.container_data}>
        <DocumentSearch />
      </div>
    </div>
  );
}

export default App;
