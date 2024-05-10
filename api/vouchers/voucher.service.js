const pool = require("../../config/database");

var errorMessage = "Error while connecting to database server";



module.exports = {
    create : (req, callback) => {
        // Initialize imageUrl to null
        let imageUrl = null;
        var data = req.body;
        const now = new Date();
        data.createAt = now;
        if(req.files.length > 0)
        {
            req.files.forEach(file => {
                data[file.fieldname] = req[file.fieldname];
              });
        }
        pool.query(`select * from vouchers where voucherCode = ?`, [data.voucherCode], (error, result, fields) => {
            if(error)
            {
                return callback(errorMessage);
            }
            if(result.length <= 0)
            {
    
                pool.query(`Insert into vouchers (voucherCode, amount, imageUrl, serviceId, expiryDate, createAt, isSlideImage) values (?,?,?,?, ?, ?, ?)`, 
                [
                    data.voucherCode, 
                    data.amount, 
                    data.imageUrl, 
                    data.serviceId, 
                    data.expiryDate,
                    data.createAt,
                    data.isSlideImage,
                ],
                (error, result, fields) => 
                {
                    if(error)
                    {
                        return callback(errorMessage);
                    }
                    else{
                        
                        return callback(null, "voucher successfully created");
                    }
                    
                });
            }
            else{
                return callback("voucher already exists with this code. Please enter other code");
            }
        });
       
    },
    update : (req, callback) => {
        let imageUrl = null;
        var data = req.body;
        const now = new Date();
        data.updateAt = now;
        if(req.files.length > 0)
        {
            req.files.forEach(file => {
                data[file.fieldname] = req[file.fieldname];
              });
        }
        
        if(data.imageUrl)
        {
            pool.query(`Update vouchers set voucherCode = ? , amount = ? , imageUrl = ?, serviceId = ?, expiryDate = ?, isSlideImage = ? where voucherId = ?`, 
            [
                data.voucherCode, 
                data.amount, 
                data.imageUrl, 
                data.serviceId, 
                data.expiryDate,
                data.isSlideImage,
                data.voucherId
            ],
            (error, result, fields) => 
            {
                if(error)
                {
                    return callback(errorMessage);
                }
                else{
                    
                    return callback(null, "voucher successfully updated");
                }
                
            });
        }
        else
        {
            pool.query(`Update vouchers set voucherCode = ? , amount = ?, serviceId = ?, expiryDate = ?, isSlideImage = ? where voucherId = ?`, 
            [
                data.voucherCode, 
                data.amount, 
                data.serviceId, 
                data.expiryDate,
                data.isSlideImage,
                data.voucherId
            ],
            (error, result, fields) => 
            {
                if(error)
                {
                    return callback(errorMessage);
                }
                else{
                    
                    return callback(null, "voucher successfully updated");
                }
                
            });
        }
    },

    deleteVoucher : (req, callback) =>{
        var data = req.body;
        pool.query("Delete from vouchers where voucherId = ?", [data.voucherId], (error, result, fields) => {
            if(error)
        {
            return callback(errorMessage);
        }
        return callback(null, "voucher successfully deleted");
        } );
    },


    getVouchers : (data, callback)=> {
        pool.query("Select * from vouchers",
        [],
            (error, result, fields) => {
            if(error)
            {
                return callback(error);
            }
            return callback(null, result);
            }
        );
    },

}