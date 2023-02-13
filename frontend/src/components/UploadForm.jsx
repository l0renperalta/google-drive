import { useState, useEffect } from 'react';
import axios from 'axios';
import { BsFillXCircleFill } from 'react-icons/bs';

const UploadForm = () => {
   const [file, setFile] = useState();
   const [files, setFiles] = useState([]);
   const [submit, setSubmit] = useState(true);
   const [deleteFile, setDeleteFile] = useState(false);

   const handleFileChange = (e) => {
      if (e.target.files) setFile(e.target.files);
   };

   useEffect(() => {
      if (submit) {
         fetchData();
      }
      if (deleteFile) {
         onDelete();
      }
   });

   const fetchData = async () => {
      const response = await fetch('http://localhost:5000/');
      const data = await response.json();
      setFiles(data);
      setSubmit(false);
   };

   const onDelete = async () => {
      const response = await fetch('http://localhost:5000/');
      const data = await response.json();
      setFiles(data);
   };

   const handleUploadClick = async (e) => {
      e.preventDefault();
      if (!file) {
         console.log('No file uploaded');
         return;
      }

      try {
         const response = await axios.post(
            'http://localhost:5000/',
            { receiveFiles: file },
            { headers: { 'Content-Type': 'multipart/form-data' } }
         );
         console.log(response);
      } catch (error) {
         console.log(error);
      }
      setSubmit(true);
   };

   const handleDeleteFile = async (file) => {
      await axios.get('http://localhost:5000/delete/' + file);
   };

   return (
      <>
         <div className="formContainer">
            <form onSubmit={handleUploadClick}>
               <input type="file" onChange={handleFileChange} multiple />
               <input type="submit" value="submit" />
            </form>
         </div>
         <div className="files">
            {files.length > 0 ? (
               files.map((file, index) => (
                  <div key={index} className="fileName">
                     <a href={`http://localhost:5000/download/${file}`}>{file}</a>
                     <BsFillXCircleFill
                        onClick={() => {
                           setDeleteFile(true);
                           handleDeleteFile(file);
                        }}
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
