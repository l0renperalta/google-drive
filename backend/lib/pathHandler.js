const path = require('path');

const handlePath = (urlPath) => {
   const relativePath = urlPath.replaceAll('-', '/');
   const absolutePath = path.join(__dirname, '../../uploads', urlPath).replaceAll('\\', '/');
   return { relativePath, absolutePath };
};

module.exports = { handlePath };
