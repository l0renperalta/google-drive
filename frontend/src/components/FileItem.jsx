import { BsFillXCircleFill } from 'react-icons/bs';
import axios from 'axios';

function FileItem({ file, index }) {
    const handleDeleteFile = async (fileName) => {
        try {
            const response = await axios.get('http://localhost:5000/delete/' + file);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div key={index} className="fileName">
            <a href={`http://localhost:5000/download/${file}`}>{file}</a>
            <BsFillXCircleFill onClick={() => handleDeleteFile(file)} />
        </div>
    );
}

export default FileItem;
