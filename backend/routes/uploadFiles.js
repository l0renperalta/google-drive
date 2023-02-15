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

router.get('/:dir', async (req, res) => {
    try {
        const dir = await fs.promises.opendir(path.join('.', 'uploads', req.params.dir));
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

router.post('/create/:dirName', (req, res) => {
    const dir = './uploads/' + req.params.dirName;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
        res.json('directory created');
    } else {
        res.json('directory already exists');
    }
});

module.exports = router;
