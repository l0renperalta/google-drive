import { useState, useEffect } from 'react';
import { uploadFilesPath, handleDeleteFilePath, handleDeleteFile, fetchDirData } from '../services/api';
import CreateDirectory from './CreateDirectory';
import ListDirectory from './ListDirectory';

const UploadForm = () => {
   const [uploadedFile, setUploadedFile] = useState();
   const [elements, setElements] = useState({ files: [], directories: [] });
   const [clickOnSubmit, setClickOnSubmit] = useState({ state: true, path: '' });
   const [clickOnDelete, setClickOnDelete] = useState(false);
   const [deleteRoot, setDeleteRoot] = useState(false);
   const [loadPath, setLoadPath] = useState({ state: false, dir: '' });

   useEffect(() => {
      if (clickOnSubmit) {
         fetchDirData(clickOnSubmit.path).then((data) => {
            setElements(data.elements);
            setClickOnSubmit(data.state);
         });
      }
      if (clickOnDelete) {
         const path = window.location.pathname.split('/')[1];
         fetchDirData(path).then((data) => {
            setElements(data.elements);
            setClickOnDelete(data.state);
         });
      }
      if (deleteRoot) {
         fetchDirData().then((data) => {
            setElements(data.elements);
            setDeleteRoot(data.state);
         });
      }
      if (loadPath) {
         const path = window.location.pathname.split('/')[1];
         fetchDirData(path).then((data) => {
            setElements(data.elements);
            setLoadPath(data.state);
         });
      }
   });

   const handleFileChange = (e) => {
      if (e.target.files) setUploadedFile(e.target.files);
   };

   const handleUploadClick = async (e) => {
      e.preventDefault();
      if (!uploadedFile) {
         console.log('No file uploaded');
         return;
      }

      const path = window.location.pathname.split('/')[1];
      await uploadFilesPath(path, uploadedFile);
      setClickOnSubmit({ state: true, path: path });

      e.target[0].value = null;
   };

   const fetchDirectories = (data) => {
      setElements(data);
   };

   const fetchDirElementes = (state, directory) => {
      setLoadPath({ state, dir: directory });
   };

   const handleDelete = (data) => {
      const path = window.location.pathname.split('/')[1];
      handleDeleteFilePath(path, data.file);
      setClickOnDelete(data.state);
   };
   const DeleteOnRoot = (data) => {
      handleDeleteFile(data.file);
      setClickOnDelete(data.state);
   };

   return (
      <>
         <form onSubmit={handleUploadClick} className="flex flex-col bg-zinc-700 m-3 p-7 rounded-xl">
            <h2 className="text-2xl mb-5 font-bold">Upload Files</h2>
            <input type="file" onChange={handleFileChange} multiple />
            <input type="submit" value="upload" className="bg-sky-700 rounded-lg m-3 p-1 font-medium hover:bg-sky-600 cursor-pointer" />
         </form>
         <CreateDirectory fetchDirectories={fetchDirectories} />

         <ListDirectory elements={elements} fetchDirElementes={fetchDirElementes} handleDelete={handleDelete} DeleteOnRoot={DeleteOnRoot} />
      </>
   );
};

export default UploadForm;
