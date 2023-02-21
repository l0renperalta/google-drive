const express = require('express');
const router = express.Router();
const path = require('path');

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
         const uploadPath = path.join('.', 'uploads', file.name);
         file.mv(uploadPath);
      });
   } catch (error) {
      console.log(error);
   }

   res.json({
      message: 'File Uploaded',
   });
});

router.post('/:dir?', (req, res) => {
   if (!req.files) {
      return res.status(400).send('No files were uploaded.');
   }

   let data = Object.values(req.files)[0];

   if (!Array.isArray(data)) {
      data = [data];
   }

   try {
      data.forEach((file) => {
         const uploadPath = path.join('.', 'uploads', req.params.dir.split('-').join('/'), file.name);
         file.mv(uploadPath);
      });
   } catch (error) {
      console.log(error);
   }

   res.json({
      message: 'File Uploaded',
   });
});

module.exports = router;
