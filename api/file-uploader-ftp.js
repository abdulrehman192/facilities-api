const ftp = require('ftp');

// Fixed FTP server configuration
const ftpConfig = {
  host: 'ftp.the1properties.com',
  port: 21,
  user: 'u725151912.ims',
  password: 'Rehman92$!'
};


class FTPUploader {
  constructor() {
    this.config = ftpConfig;
  }

  uploadFile(buffer, remoteFilePath, callback) {
    const client = new ftp();

    client.on('ready', () => {
      client.put(buffer, remoteFilePath, (err) => {
        if (err) {
          callback(err);
        } else {
          callback(null);
        }
        client.end();
      });
    });

    client.on('error', (err) => {
      console.error('FTP connection error:', err);
      callback(err);
    });

    client.connect(this.config);
  }


  uploadFileOverFTP(req, res, next){
    if (req.files && req.files.length > 0) {
        const uploadedFiles = req.files;
        uploadedFiles.forEach(async(file) => {
          const originalName = file.originalname;
          let remoteFilePath = originalName;

            if (req.query[file.fieldname]) {
                remoteFilePath = req.query[file.fieldname];
            }
            
            console.log(remoteFilePath);
            req[file.fieldname] = remoteFilePath;
        
            // Create a read stream from the file buffer
            const fileStream = require('stream').Readable.from(file.buffer);
            
            // Pipe the read stream directly to the FTP upload stream
            this.uploadFile(fileStream, remoteFilePath, (err) => {
                if (err) {
                    console.error('Error uploading file:', err);
                    next();
                }
            });
            
        });
    }
  
    next();
  };

  changeFileName(filePath, newFileName) {
    const lastIndex = filePath.lastIndexOf('/');
    return filePath.substring(0, lastIndex + 1) + newFileName;
  }
}

module.exports = FTPUploader;
