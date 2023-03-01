const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { handlePath } = require('../lib/pathHandler');

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
      const pathFixed = handlePath(req.params.path);
      const dir = await fs.promises.opendir(path.join('.', 'uploads', pathFixed.relativePath));
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
