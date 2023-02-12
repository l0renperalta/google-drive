import { useState, useEffect } from 'react';
import FileItem from './FileItem';

const FileList = () => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/')
            .then((res) => res.json())
            .then((data) => setFiles(data))
            .catch((err) => console.log(err));
    }, []);

    return <div className="files">{files.length > 0 ? files.map((file, index) => <FileItem key={index} file={file} index={index} />) : <h3>No files uploaded</h3>}</div>;
};

export default FileList;
