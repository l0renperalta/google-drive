import { BsFillXCircleFill, BsFillCapslockFill } from 'react-icons/bs';
import { GoFileDirectory } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { downloadFilePath } from '../services/api';

function ListDirectory({ elements, handleDelete, fetchDirElementes, DeleteOnRoot }) {
   const getPath = () => {
      let path = window.location.pathname;
      let splitPath = path.split('-');
      splitPath.pop();
      return splitPath.join('-');
   };

   return (
      <>
         <Link to={getPath()} onClick={() => fetchDirElementes(true)} className="bg-zinc-700 m-3 p-3 w-80 rounded-xl flex items-center justify-center">
            <BsFillCapslockFill />
         </Link>
         <div className="flex flex-col">
            {elements.directories.length > 0 || elements.files.length > 0 ? (
               <>
                  {elements.directories.map((directory, index) => (
                     <div key={index} className="bg-zinc-700 m-3 p-3 rounded-xl w-full flex items-center justify-center text-xl">
                        <GoFileDirectory />
                        <Link to={window.location.pathname.split('/')[1] + '-' + directory} onClick={() => fetchDirElementes(true, directory)} className="p-2">
                           {directory}
                        </Link>
                     </div>
                  ))}
                  {elements.files.map((file, index) => (
                     <div key={index} className="bg-zinc-700 m-3 p-3 rounded-xl w-full flex items-center justify-center text-lg">
                        {window.location.pathname.split('/')[1] ? (
                           <>
                              <Link to={downloadFilePath(window.location.pathname.split('/')[1], file)} className="p-2">
                                 {file}
                              </Link>
                              <BsFillXCircleFill
                                 onClick={() =>
                                    handleDelete({
                                       state: true,
                                       file: file,
                                    })
                                 }
                                 className="cursor-pointer"
                              />
                           </>
                        ) : (
                           <>
                              <Link to={'http://localhost:5000/download/' + file} className="p-2">
                                 {file}
                              </Link>
                              <BsFillXCircleFill
                                 onClick={() =>
                                    DeleteOnRoot({
                                       state: true,
                                       file: file,
                                    })
                                 }
                                 className="cursor-pointer"
                              />
                           </>
                        )}
                     </div>
                  ))}
               </>
            ) : (
               <h3>No files uploaded</h3>
            )}
         </div>
      </>
   );
}

export default ListDirectory;
