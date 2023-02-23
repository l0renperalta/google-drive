import { useState, useEffect } from 'react';
import { fetchData, uploadFiles, uploadFilesPath, handleDeleteFilePath, handleDeleteFile, fetchDirData } from '../services/api';
import CreateDirectory from './CreateDirectory';
import MainRoot from './MainRoot';

const UploadForm = () => {
   const [uploadedFile, setUploadedFile] = useState();
   const [elements, setElements] = useState({ files: [], directories: [] });
   const [clickOnSubmit, setClickOnSubmit] = useState({ state: true, path: '' });
   const [clickOnDelete, setClickOnDelete] = useState(false);
   const [deleteRoot, setDeleteRoot] = useState(false);
   const [onLoadPath, setOnLoadPath] = useState({ state: false, dir: '' });

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
         fetchData().then((data) => {
            setElements(data.elements);
            setClickOnDelete(data.state);
         });
      }
      if (onLoadPath) {
         const path = window.location.pathname.split('/')[1];
         fetchDirData(path).then((data) => {
            setElements(data.elements);
            setOnLoadPath(data.state);
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
      if (path.length > 1) {
         await uploadFilesPath(path, uploadedFile);
         setClickOnSubmit({ state: true, path: path });
         console.log('path true', path);
      } else {
         await uploadFiles(uploadedFile);
         setClickOnSubmit({ state: true, path: '' });
         console.log('path false', path);
      }

      e.target[0].value = null;
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

   const fetchDirectories = (data) => {
      setElements(data);
   };

   const fetchDirElementes = (state, directory) => {
      setOnLoadPath({ state, dir: directory });
   };

   const justFetch = () => {
      setOnLoadPath(true);
   };

   return (
      <>
         <div className="formContainer">
            <form onSubmit={handleUploadClick}>
               <input type="file" onChange={handleFileChange} multiple />
               <input type="submit" value="submit" />
            </form>
         </div>
         <CreateDirectory fetchDirectories={fetchDirectories} />

         <MainRoot elements={elements} fetchDirElementes={fetchDirElementes} handleDelete={handleDelete} DeleteOnRoot={DeleteOnRoot} justFetch={justFetch} />
      </>
   );
};

export default UploadForm;
