import { useState, useEffect } from 'react';
import { fetchDirData } from '../services/api';
import { BsFillXCircleFill } from 'react-icons/bs';
import { GoFileDirectory } from 'react-icons/go';
import { Link } from 'react-router-dom';

function DirName() {
   const [elements, setElements] = useState({ files: [], directories: [] });
   const [onLoadPath, setOnLoadPath] = useState(true);

   useEffect(() => {
      if (onLoadPath) {
         fetchDirData(window.location.pathname.split('/')[1]).then((data) => {
            setElements(data.elements);
            setOnLoadPath(data.state);
         });
      }
   });

   return (
      <div className="files">
         {elements.directories.map((directory, index) => (
            <div key={index}>
               <GoFileDirectory style={{ color: '#3ea6ff', paddingRight: '1em' }} />
               <Link to={directory}>{directory}</Link>
            </div>
         ))}
         {elements.files.length > 0 ? (
            elements.files.map((file, index) => (
               <div key={index}>
                  <Link to={'http://localhost:5000/download/' + file}>{file}</Link>
                  {/* <BsFillXCircleFill
                     onClick={() =>
                        handleDelete({
                           state: true,
                           file: file,
                        })
                     }
                     style={{ color: '#ff353e', paddingLeft: '1em', cursor: 'pointer' }}
                  /> */}
               </div>
            ))
         ) : (
            <h3>No files uploaded</h3>
         )}
      </div>
   );
}

export default DirName;
