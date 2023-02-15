import { useState, useRef } from 'react';
import { createDirectory } from '../services/api';

const CreateDirectory = () => {
    const [dirName, setDirName] = useState('');
    const myForm = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        createDirectory(dirName);
        myForm.current.reset();
    };

    return (
        <div className="formContainer" style={{ marginTop: '20px' }}>
            <form onSubmit={handleSubmit} ref={myForm}>
                <div>
                    <label>Create a directory</label>
                </div>
                <input type="input" onChange={(e) => setDirName(e.target.value)} />
                <input type="submit" value="submit" />
            </form>
        </div>
    );
};

export default CreateDirectory;
