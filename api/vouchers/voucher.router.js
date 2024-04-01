const { createVoucher, updateVoucher, deleteVoucher, getVouchers} = require("./voucher.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/validation-token");
const FTPUploader = require('../file-uploader');
const FTPUploaderSSH = require('../file-uploader-ssh');

// Instantiate FTPUploader
const ftpUploader = new FTPUploader();
const sftpUploader = new FTPUploaderSSH();

// Middleware to conditionally use multer based on imageUrl presence
const uploadIfImageUrl = (req, res, next) => {
  if (req.files && req.files.length > 0) {
      const uploadedFiles = req.files;
      uploadedFiles.forEach(async(file) => {
          const originalName = file.originalname;
          let remoteFilePath = originalName;

          if (req.query.fileName) {
              remoteFilePath = req.query.fileName;
          }
        
          req.imageUrl = remoteFilePath;
          // Create a read stream from the file buffer
          const fileStream = require('stream').Readable.from(file.buffer);
          
          // Pipe the read stream directly to the FTP upload stream
          ftpUploader.uploadFile(fileStream, remoteFilePath, (err) => {
              if (err) {
                  console.error('Error uploading file:', err);
                  next();
              }
          });
          // Pipe the read stream directly to the SFTP upload stream
          await sftpUploader.uploadFile(file.buffer, remoteFilePath, (err) => {
            if (err) {
                console.error('Error uploading file:', err);
                next();
            }
        });

      });
  }

  next();
};


router.post("/create-voucher", checkToken, uploadIfImageUrl, createVoucher);
router.patch("/update-voucher", checkToken, uploadIfImageUrl, updateVoucher);
router.delete("/delete-voucher", checkToken, deleteVoucher);
router.post("/get-vouchers", getVouchers);

module.exports = router;
