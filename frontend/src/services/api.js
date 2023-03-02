import axios from 'axios';

export const fetchDirData = async (dirPath) => {
   const response = await fetch('http://localhost:5000/' + dirPath);
   const elements = await response.json();
   return { elements, state: false };
};

export const uploadFilesPath = async (path, uploadedFile) => {
   await axios.post('http://localhost:5000/' + path, { receiveFiles: uploadedFile }, { headers: { 'Content-Type': 'multipart/form-data' } });
};

export const createDirectory = async (dirName) => {
   await fetch(`http://localhost:5000/create/${dirName}`, {
      method: 'POST',
   });
   return true;
};
export const createDirectoryOnPath = async (path, dirName) => {
   await fetch(`http://localhost:5000/create/${path}/${dirName}`, {
      method: 'POST',
   });
   return true;
};

export const handleDeleteFile = async (file) => {
   await axios.get('http://localhost:5000/delete/' + file);
};

export const handleDeleteFilePath = async (path, file) => {
   await axios.get('http://localhost:5000/delete/' + path + '/' + file);
};

export const downloadFilePath = (path, file) => {
   return 'http://localhost:5000/download/' + path + '/' + file;
};
