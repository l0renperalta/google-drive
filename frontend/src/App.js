import './App.css';
import UploadForm from './components/UploadForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Files from './components/Files';

function App() {
    return (
        <Router>
            <div className="container">
                <UploadForm />
            </div>
            <Routes>
                <Route path="/wallpapers" element={<Files/>} />
            </Routes>
        </Router>
    );
}

export default App;
