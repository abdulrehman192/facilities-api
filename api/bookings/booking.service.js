const pool = require("../../config/database");



module.exports = {
    create :(data, callback) => {
            const now = new Date();
            data.createAt = now;
            var items = [];
            if(data.items)
            {
              items = JSON.parse(data.items);
            }
            
            var query = `insert into bookings (userId, instructions, frequency, bookingDate, serviceDate, hours, professionals, includeMaterial, professionalId, subTotal, tax, voucherPrice, serviceFee, materialCost, netTotal, voucherCode, paymentMethod, userMethodId, status) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
            var fields = [data.userId, data.instructions, data.frequency, data.bookingDate, data.serviceDate, data.hours, data.professionals, data.includeMaterial, data.professionalId, data.subTotal, data.tax, data.voucherPrice, data.serviceFee, data.materialCost, data.netTotal, data.voucherCode, data.paymentMethod, data.userMethodId, data.status];
            pool.query(query, fields, 
             (error, results, fields)=> {
                if(error)
                    {
                        return callback(error);
                    }
                else{
                    pool.query(`select bookingId from bookings where userId = ? and bookingDate = ? and serviceDate = ? and subTotal = ? `, [data.userId, data.bookingDate, data.serviceDate, data.subTotal],
                    (error, results, fields)=> {
                        if(error)
                        {
                            return callback(error);
                        }
                        var bookingId = results[0].bookingId;
                        for(var item of items)
                        {
                            query = `insert into booking_items(bookingId, serviceId, userId, qty, price, isSubService, bookingDate, serviceDate) values(?,?,?,?,?,?,?,?)`;
                            fields = [bookingId, item.serviceId, item.userId, item.qty, item.price, item.isSubService, data.bookingDate, data.serviceDate];
                            pool.query(query, fields, (error, results, fields)=>{
                                if(error)
                                {
                                    return callback(error);
                                }

                            });
                        }
                    }
                    );
                    return callback(null, results);
                }
             });
    },
    update : (data, callback) => {
        const now = new Date();
        data.updateAt = now;
        pool.query(`update addresses set latitude = ?, longitude = ?, description = ?, updateAt = ? where id = ? `,
         [data.latitude, data.longitude, data.description, data.updateAt, data.id], 
         (error, results, fields)=> {
            if(error)
                {
                    return callback(error);
                }
            return callback(null, results);
         });
    },
    deleteAddress : (data, callback) => {
        pool.query(`delete from addresses where id = ?`,
         [data.id], 
         (error, results, fields)=> {
            if(error)
                {
                    return callback(error);
                }
            return callback(null, results);
         });
    },

    getAllUserAddresses : (data, callback) => {
        pool.query(`select * from addresses where userId = ?`,
         [data.userId], 
         (error, results, fields)=> {
            if(error)
                {
                    return callback(error);
                }
            return callback(null, results);
         });
    },
}
