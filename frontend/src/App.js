import './App.css';
import UploadForm from './components/UploadForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div className="container">
                <UploadForm />
            </div>
            <Routes>
                <Route path="/wallpapers" element={<div>Hello world!</div>} />
            </Routes>
        </Router>
    );
}

export default App;
