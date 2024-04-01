let Client = require('ssh2-sftp-client');
let sftp = new Client();
// Fixed SSH server configuration
const sshConfig = {
  host: '89.116.122.87',
  port: '22',
  username: 'root',
  password: 'Rehman92$!'
};

class SFTPUploader {
  constructor() {
    this.config = sshConfig;
    this.isConnected = false;
  }

  async uploadFile(buffer, remoteFilePath, callback) {
    try {
      // Connect to the server if not already connected
      if (!this.isConnected) {
        await this.connect();
      }
      var uploadPath = '/srv/www/uploads/facilities-files/' + remoteFilePath;
      // Upload the file
      await sftp.put(buffer, uploadPath);
      console.log('File uploaded to VPS over SSH connection successfully');
      callback(null);
    } catch (err) {
      console.error('Error uploading file to VPS over SSH connection :', err);
      callback(err);
    } finally {
      // Always disconnect from the server after upload or on error
      await this.disconnect();
    }
  }

  async connect() {
    try {
      await sftp.connect(this.config);
      console.log('Connected to SFTP server');
      this.isConnected = true;
    } catch (err) {
      console.error('Error connecting to SFTP server:', err);
    }
  }

  async disconnect() {
    try {
      await sftp.end();
      console.log('Disconnected from SFTP server');
      this.isConnected = false;
    } catch (err) {
      console.error('Error disconnecting from SFTP server:', err);
    }
  }
}

module.exports = SFTPUploader;
