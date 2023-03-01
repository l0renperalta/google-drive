const slash = process.platform === 'win32' ? '\\' : '/';

const handlePath = (urlPath) => {
  const relativePath = urlPath ? urlPath.replace(/--/g, slash) : slash;

  return { relativePath };
};

module.exports = handlePath;
