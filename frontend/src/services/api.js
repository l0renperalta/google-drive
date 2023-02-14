import axios from 'axios';

export const fetchData = async () => {
   const response = await fetch('http://localhost:5000/');
   const elements = await response.json();
   return { elements, state: false };
};

export const handleDeleteFile = async (file) => {
   await axios.get('http://localhost:5000/delete/' + file);
};
