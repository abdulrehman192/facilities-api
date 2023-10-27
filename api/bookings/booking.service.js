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
            
            var query = `insert into bookings (bookingCode, userId, instructions, frequency, bookingDate, serviceDate, hours, professionals, includeMaterial, professionalId, subTotal, tax, voucherPrice, serviceFee, materialCost, netTotal, voucherCode, paymentMethod, userMethodId, status, addressId) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
            var fields = [data.bookingCode, data.userId, data.instructions, data.frequency, data.bookingDate, data.serviceDate, data.hours, data.professionals, data.includeMaterial, data.professionalId, data.subTotal, data.tax, data.voucherPrice, data.serviceFee, data.materialCost, data.netTotal, data.voucherCode, data.paymentMethod, data.userMethodId, data.status, data.addressId];
            
            pool.query(query, fields, 
             (error, results, fields)=> {
                if(error)
                    {
                        console.log("Error here");
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
                            fields = [bookingId, item.serviceId, data.userId, item.qty, item.price, item.isSubService, item.bookingDate, item.serviceDate];
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
        var items = [];
        if(data.items)
        {
            
          items = JSON.parse(data.items);
        }
        pool.query(`update bookings set instructions = ?, hours = ?, professionals = ?, includeMaterial = ?, subTotal = ?, tax = ?, voucherPrice = ?, serviceFee = ?, materialCost = ?, netTotal = ?, voucherCode = ?, addressId = ?, updateAt = ? where bookingId = ?`,
         [data.instructions, data.hours, data.professionals, data.includeMaterial, data.subTotal, data.tax, data.voucherPrice, data.serviceFee, data.materialCost, data.netTotal, data.voucherCode, data.addressId, data.updateAt, data.bookingId], 
         (error, results, fields)=> {
            if(error)
                {
                    return callback(error);
                }
            return callback(null, results);
         });
    },
    deleteBooking : (data, callback) => {
        pool.query(`delete from bookings where bookingId = ?`,
         [data.id], 
         (error, results, fields)=> {
            if(error)
                {
                    return callback(error);
                }
                pool.query(`delete from bookingItems where bookingId = ?`,
                [data.id], 
                (error, results, fields)=> {
                   if(error)
                       {
                           return callback(error);
                       }
                });    
            return callback(null, results);
         });
    },

    getAllUserBookings : (data, callback) => {
        pool.query(`Select b.bookingId, bookingCode, b.userId, instructions, frequency, b.bookingDate, hours, professionals, includeMaterial, professionalId, subTotal, tax, voucherPrice, serviceFee, materialCost, netTotal, voucherCode, paymentMethod, userMethodId, b.serviceDate, updateAt, status, cancelReason, addressId, cancelledAt, id, i.serviceId, qty, price, isSubService from bookings b left join booking_items i on b.bookingId = i.bookingId where b.userId = ? order by b.serviceDate desc`,
         [data.userId], 
         (error, results, fields)=> {
            if(error)
                {
                    return callback(error);
                }
            else
            {
                var bookings = [];
                var items = results;
                for(var row of items)
                {
                    console.log(row);
                    let booking = bookings.find((c) => c.bookingId === row.bookingId);
                    if (!booking){
                        booking = {
                            bookingId: row.bookingId,
                            bookingCode: row.bookingCode,
                            userId: row.userId,
                            instructions: row.instructions,
                            frequency : row.frequency,
                            bookingDate: row.bookingDate,
                            hours: row.hours,
                            professionals: row.professionals,
                            includeMaterial: row.includeMaterial,
                            professionalId: row.professionalId,
                            subTotal: row.subTotal,
                            tax: row.tax,
                            voucherPrice: row.voucherPrice,
                            serviceFee: row.serviceFee,
                            materialCost: row.materialCost,
                            netTotal: row.netTotal,
                            voucherCode: row.voucherCode,
                            paymentMethod: row.paymentMethod,
                            userMethodId: row.userMethodId,
                            serviceDate: row.serviceDate,
                            status: row.status,
                            cancelReason: row.cancelReason,
                            addressId: row.addressId,
                            cancelledAt: row.cancelledAt,
                            updateAt: row.updateAt,
                            items: []
                        };
                        bookings.push(booking);
                    }
                    if(row.id != null)
                    {
                        let item = booking.items.find((s) => s.id === row.id);

                        if (!item) {
                            item = {
                                id: row.id,
                                bookingId: row.bookingId,
                                serviceId: row.serviceId,
                                userId: row.userId,
                                qty: row.qty,
                                price: row.price,
                                isSubService: row.isSubService,
                                bookingDate: row.bookingDate,
                                serviceDate: row.serviceDate,
                            };
                            booking.items.push(item);
                        }
                
                }
                
            }
            return callback(null, bookings);
            }
         });
    },
}
