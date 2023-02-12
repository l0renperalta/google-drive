import './App.css';
import FileList from './components/FileList';
import UploadForm from './components/UploadForm';

function App() {
    return (
        <div className="container">
            <UploadForm />
            <FileList />
        </div>
    );
}

export default App;
