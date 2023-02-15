const express = require('express');
const port = process.env.PORT || 5000;
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    fileUpload({
        limits: { fileSize: 1 * 1024 * 1024 },
        createParentPath: true,
        abortOnLimit: true,
    })
);
app.use(morgan('dev'));
app.use(cors());

app.use(require('./routes/uploadFiles'));
app.use(require('./routes/downloadFiles'));
app.use(require('./routes/createDirectory'));

app.listen(port, () => console.log(`Listening in port ${port}`));
