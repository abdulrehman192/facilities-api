const fs = require('fs').promises; // Using fs.promises for asynchronous file system operations
const path = require('path');

async function createDirectoryIfNotExists(directoryPath) {
  try {
    // Check if the directory exists
    await fs.access(directoryPath);
    console.log('Directory already exists');
  } catch (error) {
    // If not, create the directory
    try {
      await fs.mkdir(directoryPath, { recursive: true });
      console.log('Directory created successfully');
    } catch (err) {
      console.error('Error creating directory:', err);
      throw err; // Re-throw the error to be caught by the caller
    }
  }
}

const uploadFileToLocal = async (req, res, next) => {
  if (req.files && req.files.length > 0) {
    const uploadedFiles = req.files; // This is an array of uploaded files
    const directoryPath = path.join(__dirname, 'public', 'files');

    // Ensure directory exists before writing files
    try {
      await createDirectoryIfNotExists(directoryPath);
    } catch (error) {
      // Handle error if directory creation fails
      console.error('Error creating directory:', error);
      // Proceed with next middleware or error handling
      return next();
    }

    uploadedFiles.forEach((file) => {
      // Access file information
      const fieldName = file.fieldname; // Fieldname of the input field
      const originalName = file.originalname;
      let remoteFilePath = originalName;

      if (req.query[file.fieldname]) {
        console.log(req.query[file.fieldname]);
        remoteFilePath = req.query[file.fieldname];
      }

      console.log(remoteFilePath);
      req[file.fieldname] = remoteFilePath;
      const buffer = file.buffer; // Buffer containing the file data

      const filePath = 'public/files/' + remoteFilePath;
      fs.writeFile(filePath, buffer, (err) => {
        if (err) {
          console.error('Error writing file:', err);
        }
      });
    });
  }
  next();
};

module.exports = { uploadFileToLocal };
