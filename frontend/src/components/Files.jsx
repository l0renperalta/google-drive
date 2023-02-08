import { useState, useEffect } from 'react'

const Files = () => {

  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then(res => res.json())
      .then(data => setFiles(data))
      .catch(err => console.log(err));
  }, [])

  return (
    <div className="files">
      {files.map((file, index) => (
        <div key={index}>{file}</div>
      ))}
    </div>
  )
}

export default Files

