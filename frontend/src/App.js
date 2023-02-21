import './App.css';
import UploadForm from './components/UploadForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
   return (
      <Router>
         <div className="container">
            <UploadForm />
            <Routes>
               <Route path="/:dirName" />
            </Routes>
         </div>
      </Router>
   );
}

export default App;
