const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/', async (req, res) => {
   try {
      const dir = await fs.promises.opendir(path.join(__dirname, '..', 'uploads'));
      const elements = { files: [], directories: [] };
      for await (const dirent of dir) {
         if (dirent.isDirectory()) {
            elements.directories.push(dirent.name);
         } else {
            elements.files.push(dirent.name);
         }
      }
      res.json(elements);
   } catch (error) {
      console.log(error);
   }
});

router.post('/', (req, res) => {
   if (!req.files) {
      return res.status(400).send('No files were uploaded.');
   }

   let data = Object.values(req.files)[0];

   if (!Array.isArray(data)) {
      data = [data];
   }

   try {
      data.forEach((file) => {
         const uploadPath = path.join(__dirname, '..', 'uploads', file.name);
         file.mv(uploadPath);
      });
   } catch (error) {
      console.log(error);
   }

   res.json('File Uploaded');
});

module.exports = router;
