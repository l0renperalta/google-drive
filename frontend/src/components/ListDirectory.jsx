import { BsFillXCircleFill, BsFillCapslockFill } from 'react-icons/bs';
import { GoFileDirectory } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { downloadFilePath } from '../services/api';
import swal from 'sweetalert';

function ListDirectory({ elements, handleDelete, fetchDirElementes, DeleteOnRoot }) {
   const getPath = () => {
      let path = window.location.pathname;
      let splitPath = path.split('-');
      splitPath.pop();
      return splitPath.join('-');
   };

   const isOnHome = () => {
      if (window.location.pathname.length > 1) {
         return (
            <Link
               to={getPath()}
               onClick={() => fetchDirElementes(true)}
               className="bg-zinc-700 m-3 p-3 w-80 rounded-xl flex items-center justify-center hover:bg-zinc-600"
            >
               <BsFillCapslockFill />
            </Link>
         );
      }
   };

   const confirmDelete = async (file, onRoot) => {
      const willDelete = await swal({
         title: 'Are you sure?',
         text: 'Are you sure that you want to delete this file?',
         icon: 'warning',
         dangerMode: true,
         buttons: true,
      });

      if (willDelete) {
         if (onRoot) {
            swal('Deleted!', '', 'success');
            handleDelete({
               state: true,
               file: file,
            });
         } else {
            swal('Deleted!', '', 'success');
            DeleteOnRoot({
               state: true,
               file: file,
            });
         }
      }
   };

   return (
      <>
         {isOnHome()}
         <div className="flex flex-col">
            {elements.directories.length > 0 || elements.files.length > 0 ? (
               <>
                  {elements.directories.map((directory, index) => (
                     <div key={index} className="bg-zinc-700 m-3 p-3 rounded-xl w-full flex items-center justify-center text-xl hover:bg-zinc-600">
                        <GoFileDirectory />
                        <Link to={window.location.pathname.split('/')[1] + '-' + directory} onClick={() => fetchDirElementes(true, directory)} className="p-2">
                           {directory}
                        </Link>
                     </div>
                  ))}
                  {elements.files.map((file, index) => (
                     <div key={index} className="bg-zinc-700 m-3 p-3 rounded-xl w-full flex items-center justify-center text-lg hover:bg-zinc-600">
                        {window.location.pathname.split('/')[1] ? (
                           <>
                              <Link to={downloadFilePath(window.location.pathname.split('/')[1], file)} className="p-2">
                                 {file}
                              </Link>
                              <BsFillXCircleFill onClick={() => confirmDelete(file, true)} className="cursor-pointer" />
                           </>
                        ) : (
                           <>
                              <Link to={'http://localhost:5000/download/' + file} className="p-2">
                                 {file}
                              </Link>
                              <BsFillXCircleFill onClick={() => confirmDelete(file, false)} className="cursor-pointer" />
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
