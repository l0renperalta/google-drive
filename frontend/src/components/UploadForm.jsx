import { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
   const [file, setFile] = useState();

   const handleFileChange = (e) => {
      if (e.target.files) setFile(e.target.files[0]);
   };

   const handleUploadClick = (e) => {
      e.preventDefault();
      if (!file) return;

      axios
         .post(
            'http://localhost:5000/',
            {
               receiveFiles: file,
            },
            {
               headers: {
                  'Content-Type': 'multipart/form-data',
               },
            }
         )
         .then(function (response) {
            console.log(response);
         })
         .catch(function (error) {
            console.log(error);
         });
   };

   return (
      <div className="formContainer">
         <form onSubmit={handleUploadClick}>
            <input type="file" onChange={handleFileChange} multiple />
            <input type="submit" value="submit" />
         </form>
      </div>
   );
};

export default UploadForm;
