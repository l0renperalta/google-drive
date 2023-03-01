import './App.css';
import UploadForm from './components/UploadForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
   return (
      <div className="bg-zinc-800 text-white h-screen w-screen flex items-center justify-center flex-col font-semibold">
         <Router>
            <UploadForm />
            <Routes>
               <Route path="/:dirName" />
            </Routes>
         </Router>
      </div>
   );
}

export default App;
