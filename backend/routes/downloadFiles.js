const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/download/:name', (req, res) => {
    const fileName = req.params.name;
    const file = path.join('.', 'uploads', fileName);
    res.download(file);
});

router.get('/delete/:name', (req, res) => {
    const fileName = req.params.name;
    fs.promises.unlink(path.join('.', 'uploads', fileName));
});

module.exports = router;
