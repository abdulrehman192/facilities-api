const pool = require("../../config/database");



module.exports = {
    create :(data, callback) => {
            const now = new Date();
            data.checkedIn = now;
            pool.query(`insert into staff_check_activities (staffId, bookingId, checkedIn, checkedInLocation) values (?,?,?,?)`,
             [data.staffId, data.bookingId, data.checkedIn, data.checkedInLocation], 
             (error, results, fields)=> {
                if(error)
                    {
                        return callback(error);
                    }
                return callback(null, results);
             });
    },
    update : (data, callback) => {
        const now = new Date();
        data.checkedOut = now;
        pool.query(`update staff_check_activities set checkedOut = ?, checkedOutLocation = ? where id = ? `,
         [data.checkedOut, data.checkedOutLocation, data.id], 
         (error, results, fields)=> {
            if(error)
                {
                    return callback(error);
                }
            return callback(null, results);
         });
    },
    getStaffCheckHistory : (data, callback) => {
        var text = "";
        if(data.text){
            text = data.text
        }
        pool.query(`SELECT 
        id, 
        c.staffId, 
        c.bookingId, 
        checkedIn, 
        checkedInLocation, 
        checkedOut, 
        checkedOutLocation,
        
         s.staffId,
         name,
         phone,
         email,
         gender,
         imageUrl,
         fcmToken,
         role,
         
         b.bookingId,
         bookingCode,
         userId,
         instructions,
         frequency,
         bookingDate,
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
         serviceDate,
         status,
         cancelReason,
         addressId,
         cancelledAt
         
        from staff_check_activities c 
        left join staff s on c.staffId = s.staffId
        left join bookings b on c.bookingId = b.bookingId
        where s.name like ? or s.phone like ? or bookingCode like ?`,
         [`%${text}%`,`%${text}%`,`%${text}%`], 
         (error, results, fields)=> {
            if(error)
                {
                    return callback(error);
                }
                else
                {
                    var activites = [];
                    var items = results;
                    for(var row of items)
                    {
                        let activity = activites.find((c) => c.id === row.id);
                        if (!activity){
                            let booking = null;
                            let staff = null;
                            if(row.staffId)
                            {
                                staff = {
                                    staffId : row.staffId,
                                    name : row.name,
                                    gender : row.gender,
                                    email : row.gender,
                                    phone : row.phone,
                                    imageUrl : row.staffImageUrl,
                                    fcmToken: row.staffFcmToken,
                                };
                            }

                            if(row.bookingCode){
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
                                    items: [], 
                                    tasks: []
                                };
                            }
                        
                            activity = {
                                id : row.id, 
                                staffId : row.staffId, 
                                bookingId : row.bookingId, 
                                checkedIn : row.checkedIn, 
                                checkedInLocation : row.checkedInLocation, 
                                checkedOut : row.checkedOut, 
                                checkedOutLocation : row.checkedOutLocation,
                            }
                            activites.push(activity);
                        }
                    }
                    return callback(null, activites);
                }
        
         });
    },

    getMyCheckHistory : (data, callback) => {
        pool.query(`SELECT 
        id, 
        c.staffId, 
        c.bookingId, 
        checkedIn, 
        checkedInLocation, 
        checkedOut, 
        checkedOutLocation,
        
         s.staffId,
         name,
         phone,
         email,
         gender,
         imageUrl,
         fcmToken,
         role,
         
         b.bookingId,
         bookingCode,
         userId,
         instructions,
         frequency,
         bookingDate,
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
         serviceDate,
         status,
         cancelReason,
         addressId,
         cancelledAt
         
        from staff_check_activities c 
        left join staff s on c.staffId = s.staffId
        left join bookings b on c.bookingId = b.bookingId
        where c.staffId = ?`,
         [data.staffId], 
         (error, results, fields)=> {
            if(error)
                {
                    return callback(error);
                }
                else
                {
                    var activites = [];
                    var items = results;
                    for(var row of items)
                    {
                        let activity = activites.find((c) => c.id === row.id);
                        if (!activity){
                            let booking = null;
                            let staff = null;
                            if(row.staffId)
                            {
                                staff = {
                                    staffId : row.staffId,
                                    name : row.name,
                                    gender : row.gender,
                                    email : row.gender,
                                    phone : row.phone,
                                    imageUrl : row.staffImageUrl,
                                    fcmToken: row.staffFcmToken,
                                };
                            }

                            if(row.bookingCode){
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
                                    items: [], 
                                    tasks: []
                                };
                            }
                        
                            activity = {
                                id : row.id, 
                                staffId : row.staffId, 
                                bookingId : row.bookingId, 
                                checkedIn : row.checkedIn, 
                                checkedInLocation : row.checkedInLocation, 
                                checkedOut : row.checkedOut, 
                                checkedOutLocation : row.checkedOutLocation,
                            }
                            activites.push(activity);
                        }
                    }
                    return callback(null, activites);
                }
        
         });
    },
}
