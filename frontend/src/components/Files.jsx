import { useState, useEffect } from 'react';

function Files() {
   const [elements, setElements] = useState({ files: [], directories: [] });

   useEffect(() => {
      fetch('http://localhost:5000/wallpapers')
         .then((res) => res.json())
         .then((data) => {
            setElements(data.elements);
            console.log(data);
         });
   });

   return (
      <div>
         aea
         {/* {elements.files.length > 0 ? (
            elements.files.map((file) => <div>{file.name}</div>)
         ) : (
            <div>nay</div>
         )} */}
      </div>
   );
}

export default Files;
