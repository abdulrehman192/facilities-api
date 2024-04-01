const ftp = require('ftp');

// Fixed FTP server configuration
const ftpConfig = {
  host: 'ftp.the1bm.com',
  port: 21,
  user: 'u725151912.facilities',
  password: 'Facilities92$!'
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

  changeFileName(filePath, newFileName) {
    const lastIndex = filePath.lastIndexOf('/');
    return filePath.substring(0, lastIndex + 1) + newFileName;
  }
}

module.exports = FTPUploader;
