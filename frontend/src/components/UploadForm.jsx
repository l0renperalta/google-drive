import { useState, useEffect } from 'react';
import axios from 'axios';
import { BsFillXCircleFill } from 'react-icons/bs';
import { GoFileDirectory } from 'react-icons/go';
import { fetchData, handleDeleteFile } from '../services/api';

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

   const handleUploadClick = async (e) => {
      e.preventDefault();
      if (!uploadedFile) {
         console.log('No file uploaded');
         return;
      }

      try {
         const response = await axios.post(
            'http://localhost:5000/',
            { receiveFiles: uploadedFile },
            { headers: { 'Content-Type': 'multipart/form-data' } }
         );
         console.log(response);
      } catch (error) {
         console.log(error);
      }

      e.target[0].value = null;
      setClickOnSubmit(true);
   };

   const handleFileChange = (e) => {
      if (e.target.files) setUploadedFile(e.target.files);
   };

   return (
      <>
         <div className="formContainer">
            <form onSubmit={handleUploadClick}>
               <input type="file" onChange={handleFileChange} multiple />
               <input type="submit" value="submit" />
            </form>
         </div>
         <div className="formContainer" style={{ marginTop: '20px' }}>
            <form>
               <div>
                  <label>Create a directory</label>
               </div>
               <input type="input" />
               <input type="submit" value="submit" />
            </form>
         </div>
         <div className="files">
            {elements.directories &&
               elements.directories.map((directory, index) => (
                  <div key={index}>
                     <GoFileDirectory style={{ color: '#3ea6ff', paddingRight: '1em' }} />
                     {directory}
                  </div>
               ))}
            {elements.files.length > 0 ? (
               elements.files.map((file, index) => (
                  <div key={index}>
                     <a href={`http://localhost:5000/download/${file}`}>{file}</a>
                     <BsFillXCircleFill
                        onClick={() => {
                           setClickOnDelete(true);
                           handleDeleteFile(file);
                        }}
                        style={{ color: '#ffa53e', paddingLeft: '1em' }}
                     />
                  </div>
               ))
            ) : (
               <h3>No files uploaded</h3>
            )}
         </div>
      </>
   );
};

export default UploadForm;
