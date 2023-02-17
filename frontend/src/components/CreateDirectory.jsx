import { useState, useRef, useEffect } from 'react';
import { createDirectory, fetchData } from '../services/api';

const CreateDirectory = ({ fetchDirectories }) => {
   const [dirName, setDirName] = useState('');
   const [createDirHandler, setCreateDirHandler] = useState(false);
   const myForm = useRef();

   useEffect(() => {
      if (createDirHandler) {
         fetchData().then((data) => {
            fetchDirectories(data.elements);
            setCreateDirHandler(data.state);
         });
      }
   });

   const handleSubmit = (e) => {
      e.preventDefault();
      const response = createDirectory(dirName);
      setCreateDirHandler(response);
      myForm.current.reset();
   };

   return (
      <div className="formContainer" style={{ marginTop: '20px' }}>
         <form onSubmit={handleSubmit} ref={myForm}>
            <div>
               <label>Create a directory</label>
            </div>
            <input type="input" onChange={(e) => setDirName(e.target.value)} />
            <input type="submit" value="submit" />
         </form>
      </div>
   );
};

export default CreateDirectory;
