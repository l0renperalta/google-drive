const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/download/:id', function (req, res) {
   res.send(req.params.id);
   // const file = `${__dirname}/upload-folder/dramaticpenguin.MOV`;
   // res.download(file);
});

module.exports = router;
