import './App.css';
import Files from './components/Files'
import UploadForm from './components/UploadForm';

function App() {
  return (
    <div className="container">
      <UploadForm />
      <Files />
    </div>
  );
}

export default App;

