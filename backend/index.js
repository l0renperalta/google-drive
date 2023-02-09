const express = require('express');
const port = process.env.PORT || 5000;
const fileUpload = require('express-fileupload');
const fs = require('fs');
const cors = require('cors');

const app = express();

app.use(fileUpload());
app.use(cors());

app.get('/', async (req, res) => {
   try {
      const dir = await fs.promises.opendir(`${__dirname}/uploads`);
      const elements = [];
      for await (const dirent of dir) {
         elements.push(dirent.name);
      }
      res.json(elements);
   } catch (error) {
      console.log(error);
   }
});

app.post('/', (req, res) => {
   if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
   }

   let data = req.files.receiveFiles;

   if (!Array.isArray(data)) {
      data = [data];
   }

   try {
      data.forEach((file) => {
         const uploadPath = __dirname + '/uploads/' + file.name;
         file.mv(uploadPath);
      });
   } catch (error) {
      console.log(error);
   }

   res.json('File Uploaded');
});

app.listen(port, () => console.log(`Listening in port ${port}`));
