import { BsFillXCircleFill, BsFillCapslockFill } from 'react-icons/bs';
import { GoFileDirectory } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { downloadFilePath } from '../services/api';

function MainRoot({ elements, handleDelete, fetchDirElementes, justFetch, DeleteOnRoot }) {
   const getPath = () => {
      let path = window.location.pathname;
      let splitPath = path.split('-');
      splitPath.pop();
      return splitPath.join('-');
   };
   return (
      <>
         <Link to={getPath()}>
            <div className="back" onClick={() => justFetch()}>
               <BsFillCapslockFill />
            </div>
         </Link>
         <div className="files">
            {elements.directories.map((directory, index) => (
               <div key={index}>
                  <GoFileDirectory style={{ color: '#3ea6ff', paddingRight: '1em' }} />
                  <Link to={window.location.pathname.split('/')[1] + '-' + directory} onClick={() => fetchDirElementes(true, directory)}>
                     {directory}
                  </Link>
               </div>
            ))}
            {elements.files.length > 0 ? (
               elements.files.map((file, index) => (
                  <div key={index}>
                     {window.location.pathname.split('/')[1] ? (
                        <>
                           <Link to={downloadFilePath(window.location.pathname.split('/')[1], file)}>{file}</Link>
                           <BsFillXCircleFill
                              onClick={() =>
                                 handleDelete({
                                    state: true,
                                    file: file,
                                 })
                              }
                              style={{ color: '#ff353e', paddingLeft: '1em', cursor: 'pointer' }}
                           />
                        </>
                     ) : (
                        <>
                           <Link to={'http://localhost:5000/download/' + file}>{file}</Link>
                           <BsFillXCircleFill
                              onClick={() =>
                                 DeleteOnRoot({
                                    state: true,
                                    file: file,
                                 })
                              }
                              style={{ color: '#ff353e', paddingLeft: '1em', cursor: 'pointer' }}
                           />
                        </>
                     )}
                  </div>
               ))
            ) : (
               <h3>No files uploaded</h3>
            )}
         </div>
      </>
   );
}

export default MainRoot;
