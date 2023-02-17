import './App.css';
import UploadForm from './components/UploadForm';
import { BrowserRouter as Router, Switch, Routes, Route, Redirect } from 'react-router-dom';
import DirName from './components/DirName';

function App() {
   return (
      <Router>
         <div className="container">
            <UploadForm />
            <Routes>
               <Route path="/:dirName" element={<DirName />} />
            </Routes>
         </div>
      </Router>
   );
}

export default App;
