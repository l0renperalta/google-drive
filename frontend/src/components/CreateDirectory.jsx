import { useState, useRef, useEffect } from 'react';
import { createDirectory, createDirectoryOnPath, fetchDirData } from '../services/api';

const CreateDirectory = ({ fetchDirectories }) => {
   const [dirName, setDirName] = useState('');
   const [createDirHandler, setCreateDirHandler] = useState(false);
   const myForm = useRef();

   useEffect(() => {
      if (createDirHandler) {
         const path = window.location.pathname.split('/')[1];
         fetchDirData(path).then((data) => {
            fetchDirectories(data.elements);
            setCreateDirHandler(data.state);
         });
      }
   });

   const handleSubmit = (e) => {
      e.preventDefault();
      const path = window.location.pathname.split('/')[1];
      if (path.length > 2) {
         const response = createDirectoryOnPath(path, dirName);
         setCreateDirHandler(response);
      } else {
         const response = createDirectory(dirName);
         setCreateDirHandler(response);
      }
      myForm.current.reset();
   };

   return (
      <div className="w-96">
         <form onSubmit={handleSubmit} ref={myForm} className="flex flex-col bg-zinc-700 m-3 p-7 rounded-xl">
            <h2 className="text-2xl mb-5 font-bold">Create a Directory</h2>
            <input type="input" onChange={(e) => setDirName(e.target.value)} className="text-black p-1 w-full" placeholder="Create a directory" />
            <input type="submit" value="create" className="bg-green-700 rounded-lg m-3 p-1 font-medium hover:bg-green-600 cursor-pointer" />
         </form>
      </div>
   );
};

export default CreateDirectory;
