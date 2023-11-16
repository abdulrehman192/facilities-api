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
        pool.query(`update bookings set instructions = ?, hours = ?, professionals = ?, includeMaterial = ?, subTotal = ?, tax = ?, voucherPrice = ?, serviceFee = ?, materialCost = ?, netTotal = ?, voucherCode = ?, addressId = ?, professionalId = ?, updateAt = ? where bookingId = ?`,
         [data.instructions, data.hours, data.professionals, data.includeMaterial, data.subTotal, data.tax, data.voucherPrice, data.serviceFee, data.materialCost, data.netTotal, data.voucherCode, data.addressId, data.professionalId, data.updateAt, data.bookingId], 
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
        pool.query(`Select
         b.bookingId,
         bookingCode, 
         instructions,
         frequency,
         b.bookingDate,
         hours, 
         professionals, 
         includeMaterial, 
         professionalId, 
         subTotal, 
         tax, 
         voucherPrice, 
         serviceFee, 
         materialCost, 
         netTotal, 
         voucherCode, 
         paymentMethod, 
         userMethodId, 
         b.serviceDate, 
         status, 
         cancelReason,
         cancelledAt, 
         b.updateAt,
         
         i.id, 
         i.serviceId, 
         qty, 
         price, 
         isSubService,
         
         b.userId,
         u.name as username,
         u.gender,
         u.phone,
         u.email,
         u.latitude,
         u.longitude,
         u.imageUrl,
         u.fcmToken,
         
         addressId, 
         a.latitude as addressLatitude,
         a.longitude as addressLongitude,
         a.description as addressDescription,

         s.staffId,
         s.name as staffName,
         s.phone as staffPhone,
         s.email as staffEmail,
         s.gender as staffGender,
         s.imageUrl as staffImageUrl,
         s.fcmToken as staffFcmToken,
         s.role
         
         from bookings b 
         left join booking_items i on b.bookingId = i.bookingId
         left join users u on b.userId = u.id
         left join addresses a on b.addressId = a.id
         left join staff s on b.professionalId = s.staffId
         where b.userId = ? order by b.serviceDate desc`,
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
                    let booking = bookings.find((c) => c.bookingId === row.bookingId);
                    if (!booking){
                        let user = null;
                        let address = null;
                        let staff = null;
                        if(row.staffId)
                        {
                            staff = {
                                staffId : row.staffId,
                                name : row.staffName,
                                gender : row.staffGender,
                                email : row.staffEmail,
                                longitude : row.longitude,
                                imageUrl : row.staffImageUrl,
                                fcmToken: row.staffFcmToken,
                            };
                        }
                        if(row.addressLatitude)
                        {
                            address = {
                                id : row.addressId,
                                userId : row.userId,
                                latitude : row.addressLatitude,
                                longitude: row.addressLongitude,
                                description : row.addressDescription,
                            };
                        }
                        if(row.username)
                        {
                            user = {
                                id : row.userId,
                                name : row.username,
                                gender : row.gender,
                                email : row.email,
                                phone : row.phone,
                                latitude : row.latitude,
                                longitude : row.longitude,
                                imageUrl : row.imageUrl,
                                fcmToken: row.fcmToken,

                            };
                        }
                        booking = {
                            bookingId: row.bookingId,
                            professionalId: row.professionalId,
                            userId: row.userId,
                            addressId: row.addressId,
                            bookingCode: row.bookingCode,
                            instructions: row.instructions,
                            frequency : row.frequency,
                            bookingDate: row.bookingDate,
                            hours: row.hours,
                            professionals: row.professionals,
                            includeMaterial: row.includeMaterial,
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
                            cancelledAt: row.cancelledAt,
                            updateAt: row.updateAt,
                            user : user,
                            address : address,
                            staff : staff,
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
   
    getAllBookings : (data, callback) => {
        var text = data.text;
        if(!text)
        {
            text = "";
        }
        pool.query(`Select
         b.bookingId,
         bookingCode, 
         instructions,
         frequency,
         b.bookingDate,
         hours, 
         professionals, 
         includeMaterial, 
         professionalId, 
         subTotal, 
         tax, 
         voucherPrice, 
         serviceFee, 
         materialCost, 
         netTotal, 
         voucherCode, 
         paymentMethod, 
         userMethodId, 
         b.serviceDate, 
         status, 
         cancelReason,
         cancelledAt, 
         b.updateAt,
         
         i.id, 
         i.serviceId, 
         qty, 
         price, 
         isSubService,
         
         b.userId,
         u.name as username,
         u.gender,
         u.phone,
         u.email,
         u.latitude,
         u.longitude,
         u.imageUrl,
         u.fcmToken,
         
         addressId, 
         a.latitude as addressLatitude,
         a.longitude as addressLongitude,
         a.description as addressDescription,

         s.staffId,
         s.name as staffName,
         s.phone as staffPhone,
         s.email as staffEmail,
         s.gender as staffGender,
         s.imageUrl as staffImageUrl,
         s.fcmToken as staffFcmToken,
         s.role
         
         from bookings b 
         left join booking_items i on b.bookingId = i.bookingId
         left join users u on b.userId = u.id
         left join addresses a on b.addressId = a.id
         left join staff s on b.professionalId = s.staffId
         where bookingCode like ? or frequency like ? or s.name like ? or s.role like ? or voucherCode like ? or paymentMethod like ? or status like ? or u.name like ? or u.phone like ? or u.email like ? or s.phone like ? order by b.serviceDate desc`,
         [`%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`], 
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
                    let booking = bookings.find((c) => c.bookingId === row.bookingId);
                    if (!booking){
                        let user = null;
                        let address = null;
                        let staff = null;
                        if(row.staffId)
                        {
                            staff = {
                                staffId : row.staffId,
                                name : row.staffName,
                                gender : row.staffGender,
                                email : row.staffEmail,
                                longitude : row.longitude,
                                imageUrl : row.staffImageUrl,
                                fcmToken: row.staffFcmToken,
                            };
                        }
                        if(row.addressLatitude)
                        {
                            address = {
                                id : row.addressId,
                                userId : row.userId,
                                latitude : row.addressLatitude,
                                longitude: row.addressLongitude,
                                description : row.addressDescription,
                            };
                        }
                        if(row.username)
                        {
                            user = {
                                id : row.userId,
                                name : row.username,
                                gender : row.gender,
                                email : row.email,
                                phone : row.phone,
                                latitude : row.latitude,
                                longitude : row.longitude,
                                imageUrl : row.imageUrl,
                                fcmToken: row.fcmToken,

                            };
                        }
                        booking = {
                            bookingId: row.bookingId,
                            professionalId: row.professionalId,
                            userId: row.userId,
                            addressId: row.addressId,
                            bookingCode: row.bookingCode,
                            instructions: row.instructions,
                            frequency : row.frequency,
                            bookingDate: row.bookingDate,
                            hours: row.hours,
                            professionals: row.professionals,
                            includeMaterial: row.includeMaterial,
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
                            cancelledAt: row.cancelledAt,
                            updateAt: row.updateAt,
                            user : user,
                            address : address,
                            staff : staff,
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

    cancelBooking: (data, callback) =>{
        pool.query(`update bookings set cancelReason = ?, status = ?, cancelledAt = ? where bookingId = ?`,
        [ data.cancelReason, data.status, data.cancelledAt, data.bookingId], 
        (error, results, fields)=> {
           if(error)
               {
                   return callback(error);
               }
           return callback(null, results);
        });
    },

    updateBookingStatus: (data, callback) =>{
        const now = new Date();
        data.updateAt = now;
        pool.query(`update bookings set status = ?, updateAt = ? where bookingId = ?`,
        [data.status, data.updateAt, data.bookingId], 
        (error, results, fields)=> {
           if(error)
               {
                   return callback(error);
               }
           return callback(null, results);
        });
    }
}
