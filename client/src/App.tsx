import './App.css';
import DocumentSearch from './components/DocumentSearch/DocumentSearch';

function App() {
  return (
    <div>
      <div className="up_text">
        <h1>MyApp</h1>
        <p>username</p>
      </div>
      <div className="container_data">
        <DocumentSearch />
      </div>
    </div>
  );
}

export default App;
