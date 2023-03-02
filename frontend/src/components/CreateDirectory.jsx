import { useState, useRef, useEffect } from 'react';
import { createDirectory, createDirectoryOnPath, fetchDirData } from '../services/api';
import swal from 'sweetalert';

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
      if (dirName.length < 1) {
         swal('Oops!', 'Directory name can not be empty', 'error');
      } else {
         const path = window.location.pathname.split('/')[1];
         if (path.length > 2) {
            const response = createDirectoryOnPath(path, dirName);
            setCreateDirHandler(response);
         } else {
            const response = createDirectory(dirName);
            setCreateDirHandler(response);
         }
         swal('Directory created!', '', 'success');
         myForm.current.reset();
         setDirName('');
      }
   };

   return (
      <div className="w-96">
         <form onSubmit={handleSubmit} ref={myForm} className="flex flex-col bg-zinc-700 m-3 p-7 rounded-xl">
            <h2
               className="text-2xl mb-5 font-bold"
               onClick={() =>
                  swal({
                     title: 'Are you sure?',
                     text: 'Are you sure that you want to leave this page?',
                     icon: 'warning',
                     dangerMode: true,
                  }).then((willDelete) => {
                     if (willDelete) {
                        swal('Deleted!', 'Your imaginary file has been deleted!', 'success');
                     }
                  })
               }
            >
               Create a Directory
            </h2>
            <input type="input" onChange={(e) => setDirName(e.target.value)} className="text-black p-1 w-full" placeholder="Create a directory" />
            <input type="submit" value="create" className="bg-green-700 rounded-lg m-3 p-1 font-medium hover:bg-green-600 cursor-pointer" />
         </form>
      </div>
   );
};

export default CreateDirectory;
