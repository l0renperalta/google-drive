import { useState } from 'react'

const UploadForm = () => {

  const [selectedFile, setSelectedFile] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedFile);

    // const response = await fetch('http://localhost:5000/upload', {
    //   method: 'POST', 
    //   mode: 'cors',  
    //   body: JSON.stringify(data) 
    // });
  };

  return (
    <div className="formContainer">
      <form onSubmit={onSubmit}>
        <input type="file" name="receiveFiles" value={selectedFile} onChange={(e) => setSelectedFile(e.target.files[0])}/>
        <input type="submit" value="submit" />
      </form>
    </div>
  )
}

export default UploadForm

