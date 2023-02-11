const express = require('express');
const port = process.env.PORT || 5000;
const fileUpload = require('express-fileupload');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors());

app.use(require('./routes/uploadFiles'));
app.use(require('./routes/downloadFiles'));

app.listen(port, () => console.log(`Listening in port ${port}`));
