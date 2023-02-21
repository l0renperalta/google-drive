const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/', async (req, res) => {
   try {
      const dir = await fs.promises.opendir(path.join('.', 'uploads'));
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

router.get('/:path?', async (req, res) => {
   try {
      const dir = await fs.promises.opendir(path.join('.', 'uploads', req.params.path.split('-').join('/')));
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

module.exports = router;
