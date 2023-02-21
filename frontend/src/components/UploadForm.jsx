import { useState, useEffect } from 'react';
import { fetchData, uploadFiles, uploadFilesPath, handleDeleteFile, fetchDirData } from '../services/api';
import CreateDirectory from './CreateDirectory';
import MainRoot from './MainRoot';

const UploadForm = () => {
   const [uploadedFile, setUploadedFile] = useState();
   const [elements, setElements] = useState({ files: [], directories: [] });
   const [clickOnSubmit, setClickOnSubmit] = useState(true);
   const [clickOnDelete, setClickOnDelete] = useState(false);
   const [onLoadPath, setOnLoadPath] = useState({ state: false, dir: '' });

   useEffect(() => {
      if (clickOnSubmit) {
         fetchData().then((data) => {
            setElements(data.elements);
            setClickOnSubmit(data.state);
         });
      }
      if (clickOnDelete) {
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
      if (path.length > 2) {
         await uploadFilesPath(path, uploadedFile);
      } else {
         await uploadFiles(uploadedFile);
      }

      e.target[0].value = null;
      setClickOnSubmit(true);
   };

   const handleDelete = (data) => {
      setClickOnDelete(data.state);
      handleDeleteFile(data.file);
   };

   const fetchDirectories = (data) => {
      setElements(data);
   };

   const fetchDirElementes = (state, directory) => {
      setOnLoadPath({ state, dir: directory });
   };

   const justFetch = () => {
      setClickOnSubmit(true);
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

         <MainRoot elements={elements} fetchDirElementes={fetchDirElementes} handleDelete={handleDelete} justFetch={justFetch} />
      </>
   );
};

export default UploadForm;
