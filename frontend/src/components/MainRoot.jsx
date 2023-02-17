import { BsFillXCircleFill } from 'react-icons/bs';
import { GoFileDirectory } from 'react-icons/go';
import { Link } from 'react-router-dom';

function MainRoot({ elements, handleDelete }) {
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
                  <BsFillXCircleFill
                     onClick={() =>
                        handleDelete({
                           state: true,
                           file: file,
                        })
                     }
                     style={{ color: '#ff353e', paddingLeft: '1em', cursor: 'pointer' }}
                  />
               </div>
            ))
         ) : (
            <h3>No files uploaded</h3>
         )}
      </div>
   );
}

export default MainRoot;
