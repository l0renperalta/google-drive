const express = require('express');
const router = express.Router();
const fs = require('fs');

router.post('/create/:dirName', (req, res) => {
   const dir = './uploads/' + req.params.dirName;

   if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      res.json('directory created');
   } else {
      res.json('directory already exists');
   }
});

router.post('/create/:path/:dirName', (req, res) => {
   const finalPath = `./uploads/${req.params.path.split('-').join('/')}/`;
   const dir = finalPath + req.params.dirName;
   if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      res.json('directory created');
   } else {
      res.json('directory already exists');
   }
});

module.exports = router;
