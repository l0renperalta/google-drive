import { useState, useEffect } from 'react';
import { fetchData, uploadFiles, handleDeleteFile } from '../services/api';
import CreateDirectory from './CreateDirectory';
import MainRoot from './MainRoot';

const UploadForm = () => {
   const [uploadedFile, setUploadedFile] = useState();
   const [elements, setElements] = useState({ files: [], directories: [] });
   const [clickOnSubmit, setClickOnSubmit] = useState(true);
   const [clickOnDelete, setClickOnDelete] = useState(false);

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

      await uploadFiles(uploadedFile);

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

   return (
      <>
         <div className="formContainer">
            <form onSubmit={handleUploadClick}>
               <input type="file" onChange={handleFileChange} multiple />
               <input type="submit" value="submit" />
            </form>
         </div>
         <CreateDirectory fetchDirectories={fetchDirectories} />
         <MainRoot elements={elements} handleDelete={handleDelete} />
      </>
   );
};

export default UploadForm;
