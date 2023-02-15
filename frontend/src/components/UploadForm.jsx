import { useState, useEffect } from 'react';
import axios from 'axios';
import { BsFillXCircleFill } from 'react-icons/bs';
import { GoFileDirectory } from 'react-icons/go';
import { fetchData, uploadFiles, handleDeleteFile } from '../services/api';
import { Link } from 'react-router-dom';
import CreateDirectory from './CreateDirectory';

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

        await uploadFiles(uploadedFile);

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
            <CreateDirectory />
            <div className="files">
                {elements.directories &&
                    elements.directories.map((directory, index) => (
                        <div key={index}>
                            <GoFileDirectory style={{ color: '#3ea6ff', paddingRight: '1em' }} />
                            <Link to={directory}>{directory}</Link>
                        </div>
                    ))}
                {elements.files.length > 0 ? (
                    elements.files.map((file, index) => (
                        <div key={index}>
                            <Link to={'http://localhost:5000/download/' + file}>{file}</Link>
                            <BsFillXCircleFill
                                onClick={() => {
                                    setClickOnDelete(true);
                                    handleDeleteFile(file);
                                }}
                                style={{ color: '#ff353e', paddingLeft: '1em', cursor: 'pointer' }}
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
