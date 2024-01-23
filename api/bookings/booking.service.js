const pool = require("../../config/database");



module.exports = {
    create :(data, callback) => {
            const now = new Date();
            data.updateAt = now;
            var items = [];
            var professionals = [];
            if(data.items)
            {
                
              items = JSON.parse(data.items);
            }

            if(data.staff)
            {
                
                professionals = JSON.parse(data.staff);
            }
            
            var query = `insert into bookings (bookingCode, userId, addressId, instructions, frequency, hours, professionals, includeMaterial, voucherCode, subTotal, tax, voucherPrice, serviceFee, materialCost, creditPoints, discount, netTotal, discountDescription, paymentMethod, userMethodId, paymentRemarks, serviceDate, status, createAt, updateAt) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
            var fields = [data.bookingCode, data.userId, data.addressId, data.instructions, data.frequency, data.hours, data.professionals, data.includeMaterial, data.voucherCode, data.subTotal, data.tax, data.voucherPrice, data.serviceFee, data.materialCost, data.creditPoints, data.discount, data.netTotal, data.discountDescription, data.paymentMethod, data.userMethodId, data.paymentRemarks, data.serviceDate, data.status, data.createAt, data.updateAt];
            
            pool.query(query, fields, 
             (error, results, fields)=> {
                if(error)
                    {
                        console.log(error);
                        return callback(error);
                    }
                else{
                    pool.query(`select bookingId from bookings where userId = ? and createAt = ? and serviceDate = ? and subTotal = ? `, [data.userId, data.createAt, data.serviceDate, data.subTotal],
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

                        for(var professional of professionals)
                        {
                            query = `insert into booking_professionals (bookingId, professionalId, assignDate, modifiedAt) values(?,?,?,?)`;
                            fields = [bookingId, professional.professionalId, data.createAt, data.createAt];
                            pool.query(query, fields, (error, x, fields)=>{
                                if(error)
                                {
                                    console.log("Here is the fucking error");
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
            var professionals = [];
            if(data.items)
            {
                
              items = JSON.parse(data.items);
            }

            if(data.professionals)
            {
                
                professionals = JSON.parse(data.staff);
            }
            
            let sql = 'UPDATE bookings SET ';
            const setClauses = [];
            
            for (const key in data) {
                if (data[key] !== null) {
                setClauses.push(`${key} = ?`);
                }
            }
            sql += setClauses.join(', '); 
            sql += ' WHERE bookingId = ?'; 
            const values = [...Object.values(data).filter(val => val !== null), data.id];

            pool.query(sql, values, 
                (error, results, fields)=> {
                    if(error)
                        {
                            return callback(errorMessage);
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
                pool.query(`delete from booking_professionals where bookingId = ?`,
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
        var text = data.text;
        if(!text)
        {
            text = "";
        }
        pool.query(`Select
        b.bookingId, 
        bookingCode, 
        b.userId, 
        addressId, 
        instructions, 
        frequency, 
        hours, 
        professionals, 
        includeMaterial, 
        voucherCode, 
        subTotal, 
        tax, 
        voucherPrice, 
        serviceFee, 
        materialCost, 
        b.creditPoints, 
        discount, 
        netTotal, 
        discountDescription, 
        paymentMethod, 
        userMethodId, 
        paymentRemarks, 
        b.serviceDate, 
        b.status, 
        b.createAt, 
        b.updateAt, 
        cancelReason, 
        cancelledAt,
        paymentReceived,
        
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
        u.country,
        u.latitude,
        u.longitude,
        u.imageUrl,
        u.fcmToken,
        
        addressId, 
        a.latitude as addressLatitude,
        a.longitude as addressLongitude,
        a.description as addressDescription,

        c.id as checkId,
        checkedIn,
        checkedInLocation,
        checkedOut,
        checkedOutLocation,
        
        p.id as assignId,
		professionalId,
        assignDate,
        modifiedAt,
        
        s.staffId,
        s.name as staffName,
        s.phone as staffPhone,
        s.email as staffEmail,
        s.gender as staffGender,
        s.imageUrl as staffImageUrl,
        s.fcmToken as staffFcmToken,
        s.role,
        
        t.id as taskId, 
        t.staffId as taskStaffId,
        title as taskTitle, 
        t.description as taskDescription, 
        t.status as taskStatus, 
        t.createAt as taskCreateAt, 
        t.completeAt as taskCompleteAt,
        
        m.id as paymentMethodId,
		cardNumber, 
        expiryDate, 
        cvv, 
        m.description as methodDescription
        
        from bookings b 
        left join booking_items i on b.bookingId = i.bookingId
        left join users u on b.userId = u.id
        left join addresses a on b.addressId = a.id
        left join booking_professionals p on b.bookingId = p.bookingId
        left join staff s on p.professionalId = s.staffId
        left join staff_check_activities c on b.bookingId = c.bookingId
        left join tasks t on b.bookingId = t.bookingId
        left join user_payment_methods m on m.id = b.userMethodId
        where b.userId = ? and bookingCode like ? or frequency like ? or s.name like ? or s.role like ? or voucherCode like ? or paymentMethod like ? or b.status like ? or u.name like ? or u.phone like ? or u.email like ? or s.phone like ? order by b.serviceDate desc`,
         [data.userId, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`], 
         (error, results, fields)=> {
            if(error)
                {
                    console.log("here is the fucking error");
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
                            let userPaymentMethod = null;
                            
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
                                    country : row.country,
                                    latitude : row.latitude,
                                    longitude : row.longitude,
                                    imageUrl : row.imageUrl,
                                    fcmToken: row.fcmToken,
    
                                };
                            }

                            if(row.paymentMethodId)
                            {
                                userPaymentMethod = {
                                    id: row.paymentMethodId,
                                    cardNumber: row.cardNumber,
                                    expiryDate: row.expiryDate,
                                    cvv: row.cvv,
                                    description: row.methodDescription,
                                };
                            }
                            booking = {
                                bookingId: row.bookingId, 
                                bookingCode: row.bookingCode, 
                                userId: row.userId, 
                                addressId: row.addressId, 
                                instructions: row.instructions, 
                                frequency: row.frequency, 
                                hours: row.hours, 
                                professionals: row.professionals, 
                                includeMaterial: row.includeMaterial, 
                                voucherCode: row.voucherCode, 
                                subTotal: row.subTotal, 
                                tax: row.tax, 
                                voucherPrice: row.voucherPrice, 
                                serviceFee: row.serviceFee, 
                                materialCost: row.materialCost, 
                                creditPoints: row.creditPoints, 
                                discount: row.discount, 
                                netTotal: row.netTotal, 
                                discountDescription: row.discountDescription, 
                                paymentMethod: row.paymentMethod, 
                                userMethodId: row.userMethodId, 
                                paymentRemarks: row.paymentRemarks, 
                                serviceDate: row.serviceDate, 
                                status: row.status, 
                                createAt: row.createAt, 
                                updateAt: row.updateAt, 
                                cancelReason: row.cancelReason, 
                                cancelledAt: row.cancelledAt,
                                paymentReceived: row.paymentReceived,
                                user : user,
                                address : address,
                                userPaymentMethod: userPaymentMethod,
                                staff : [],
                                items: [], 
                                tasks: [],
                                check_activities: []
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
                                    bookingDate: row.createAt,
                                    serviceDate: row.serviceDate,
                                };
                                booking.items.push(item);
                            }
                    
                        }
    
                        if(row.taskId != null)
                        {
                            let task = booking.tasks.find((s) => s.id === row.taskId);
    
                            if (!task) {
                                task = {
                                    id: row.taskId,
                                    staffId: row.staffId,
                                    title: row.taskTitle,
                                    description: row.taskDescription,
                                    status: row.taskStatus,
                                    createAt: row.taskCreateAt,
                                    completeAt: row.taskCompleteAt
                                };
                                booking.tasks.push(task);
                            }
                    
                        }

                        if(row.checkId != null)
                        {
                            let activity = booking.check_activities.find((c) => c.id === row.checkId);
    
                            if (!activity) {
                                activity = {
                                    id: row.checkId,
                                    bookingId: row.bookingId,
                                    staffId: row.staffId,
                                    checkedIn: row.checkedIn,
                                    checkedInLocation: row.checkedInLocation,
                                    checkedOut: row.checkedOut,
                                    checkedOutLocation: row.checkedOutLocation,
                                };
                                booking.check_activities.push(activity);
                            }
                    
                        }

                        if(row.staffId != null)
                        {
                            let s = booking.staff.find((c) => c.staffId === row.staffId);
    
                            if (!s) {
                                s = {
                                    staffId: row.staffId,
                                    name: row.staffName,
                                    phone: row.staffPhone,
                                    email: row.staffEmail,
                                    gender: row.staffGender,
                                    imageUrl: row.staffImageUrl,
                                    fcmToken: row.staffFcmToken,
                                    role: row.role,
                                    serviceDate: row.serviceDate
                                };
                                booking.staff.push(s);
                            }
                    
                        }
                    
                }
                return callback(null, bookings);
                }
         });
    },

    getAllProfessionalBookings : (data, callback) => {
        var text = data.text;
        if(!text)
        {
            text = "";
        }
        console.log(data.professionalId);
        pool.query(`Select
        b.bookingId, 
        bookingCode, 
        b.userId, 
        addressId, 
        instructions, 
        frequency, 
        hours, 
        professionals, 
        includeMaterial, 
        voucherCode, 
        subTotal, 
        tax, 
        voucherPrice, 
        serviceFee, 
        materialCost, 
        b.creditPoints, 
        discount, 
        netTotal, 
        discountDescription, 
        paymentMethod, 
        userMethodId, 
        paymentRemarks, 
        b.serviceDate, 
        b.status, 
        b.createAt, 
        b.updateAt, 
        cancelReason, 
        cancelledAt,
        paymentReceived,
        
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
        u.country,
        u.latitude,
        u.longitude,
        u.imageUrl,
        u.fcmToken,
        
        addressId, 
        a.latitude as addressLatitude,
        a.longitude as addressLongitude,
        a.description as addressDescription,

        c.id as checkId,
        checkedIn,
        checkedInLocation,
        checkedOut,
        checkedOutLocation,
        
        p.id as assignId,
		professionalId,
        assignDate,
        modifiedAt,
        
        s.staffId,
        s.name as staffName,
        s.phone as staffPhone,
        s.email as staffEmail,
        s.gender as staffGender,
        s.imageUrl as staffImageUrl,
        s.fcmToken as staffFcmToken,
        s.role,
        
        t.id as taskId, 
        t.staffId as taskStaffId,
        title as taskTitle, 
        t.description as taskDescription, 
        t.status as taskStatus, 
        t.createAt as taskCreateAt, 
        t.completeAt as taskCompleteAt,
        
        m.id as paymentMethodId,
		cardNumber, 
        expiryDate, 
        cvv, 
        m.description as methodDescription
        
        from bookings b 
        left join booking_items i on b.bookingId = i.bookingId
        left join users u on b.userId = u.id
        left join addresses a on b.addressId = a.id
        left join booking_professionals p on b.bookingId = p.bookingId
        left join staff s on p.professionalId = s.staffId
        left join staff_check_activities c on b.bookingId = c.bookingId
        left join tasks t on b.bookingId = t.bookingId
        left join user_payment_methods m on m.id = b.userMethodId
         where s.staffId = ? and (bookingCode like ? or frequency like ? or s.name like ? or s.role like ? or voucherCode like ? or paymentMethod like ? or b.status like ? or u.name like ? or u.phone like ? or u.email like ? or s.phone like ? ) order by b.serviceDate desc`,
         [data.professionalId, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`], 
         (error, results, fields)=> {
            if(error)
                {
                    console.log("Here is error");
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
                            let userPaymentMethod = null;
                            
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
                                    country : row.country,
                                    latitude : row.latitude,
                                    longitude : row.longitude,
                                    imageUrl : row.imageUrl,
                                    fcmToken: row.fcmToken,
    
                                };
                            }

                            if(row.paymentMethodId)
                            {
                                userPaymentMethod = {
                                    id: row.paymentMethodId,
                                    cardNumber: row.cardNumber,
                                    expiryDate: row.expiryDate,
                                    cvv: row.cvv,
                                    description: row.methodDescription,
                                };
                            }
                            booking = {
                                bookingId: row.bookingId, 
                                bookingCode: row.bookingCode, 
                                userId: row.userId, 
                                addressId: row.addressId, 
                                instructions: row.instructions, 
                                frequency: row.frequency, 
                                hours: row.hours, 
                                professionals: row.professionals, 
                                includeMaterial: row.includeMaterial, 
                                voucherCode: row.voucherCode, 
                                subTotal: row.subTotal, 
                                tax: row.tax, 
                                voucherPrice: row.voucherPrice, 
                                serviceFee: row.serviceFee, 
                                materialCost: row.materialCost, 
                                creditPoints: row.creditPoints, 
                                discount: row.discount, 
                                netTotal: row.netTotal, 
                                discountDescription: row.discountDescription, 
                                paymentMethod: row.paymentMethod, 
                                userMethodId: row.userMethodId, 
                                paymentRemarks: row.paymentRemarks, 
                                serviceDate: row.serviceDate, 
                                status: row.status, 
                                createAt: row.createAt, 
                                updateAt: row.updateAt, 
                                cancelReason: row.cancelReason, 
                                cancelledAt: row.cancelledAt,
                                user : user,
                                address : address,
                                userPaymentMethod: userPaymentMethod,
                                paymentReceived : row.paymentReceived,
                                staff : [],
                                items: [], 
                                tasks: [],
                                check_activities: []
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
                                    bookingDate: row.createAt,
                                    serviceDate: row.serviceDate,
                                };
                                booking.items.push(item);
                            }
                    
                        }
    
                        if(row.taskId != null)
                        {
                            let task = booking.tasks.find((s) => s.id === row.taskId);
    
                            if (!task) {
                                task = {
                                    id: row.taskId,
                                    staffId: row.taskStaffId,
                                    title: row.taskTitle,
                                    description: row.taskDescription,
                                    status: row.taskStatus,
                                    createAt: row.taskCreateAt,
                                    completeAt: row.taskCompleteAt
                                };
                                booking.tasks.push(task);
                            }
                    
                        }

                        if(row.checkId != null)
                        {
                            let activity = booking.check_activities.find((c) => c.id === row.checkId);
    
                            if (!activity) {
                                activity = {
                                    id: row.checkId,
                                    bookingId: row.bookingId,
                                    staffId: row.staffId,
                                    checkedIn: row.checkedIn,
                                    checkedInLocation: row.checkedInLocation,
                                    checkedOut: row.checkedOut,
                                    checkedOutLocation: row.checkedOutLocation,
                                };
                                booking.check_activities.push(activity);
                            }
                    
                        }

                        if(row.staffId != null)
                        {
                            let s = booking.staff.find((c) => c.staffId === row.staffId);
    
                            if (!s) {
                                s = {
                                    staffId: row.staffId,
                                    name: row.staffName,
                                    phone: row.staffPhone,
                                    email: row.staffEmail,
                                    gender: row.staffGender,
                                    imageUrl: row.staffImageUrl,
                                    fcmToken: row.staffFcmToken,
                                    role: row.role,
                                    serviceDate: row.serviceDate
                                };
                                booking.staff.push(s);
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
        b.userId, 
        addressId, 
        instructions, 
        frequency, 
        hours, 
        professionals, 
        includeMaterial, 
        voucherCode, 
        subTotal, 
        tax, 
        voucherPrice, 
        serviceFee, 
        materialCost, 
        b.creditPoints, 
        discount, 
        netTotal, 
        discountDescription, 
        paymentMethod, 
        userMethodId, 
        paymentRemarks, 
        b.serviceDate, 
        b.status, 
        b.createAt, 
        b.updateAt, 
        cancelReason, 
        cancelledAt,
        paymentReceived,
        
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
        u.country,
        u.latitude,
        u.longitude,
        u.imageUrl,
        u.fcmToken,
        
        addressId, 
        a.latitude as addressLatitude,
        a.longitude as addressLongitude,
        a.description as addressDescription,

        c.id as checkId,
        checkedIn,
        checkedInLocation,
        checkedOut,
        checkedOutLocation,
        
        p.id as assignId,
		professionalId,
        assignDate,
        modifiedAt,
        
        s.staffId,
        s.name as staffName,
        s.phone as staffPhone,
        s.email as staffEmail,
        s.gender as staffGender,
        s.imageUrl as staffImageUrl,
        s.fcmToken as staffFcmToken,
        s.role,
        
        t.id as taskId, 
        t.staffId as taskStaffId,
        title as taskTitle, 
        t.description as taskDescription, 
        t.status as taskStatus, 
        t.createAt as taskCreateAt, 
        t.completeAt as taskCompleteAt,
        
        m.id as paymentMethodId,
		cardNumber, 
        expiryDate, 
        cvv, 
        m.description as methodDescription
        
        from bookings b 
        left join booking_items i on b.bookingId = i.bookingId
        left join users u on b.userId = u.id
        left join addresses a on b.addressId = a.id
        left join booking_professionals p on b.bookingId = p.bookingId
        left join staff s on p.professionalId = s.staffId
        left join staff_check_activities c on b.bookingId = c.bookingId
        left join tasks t on b.bookingId = t.bookingId
        left join user_payment_methods m on m.id = b.userMethodId
         where bookingCode like ? or frequency like ? or s.name like ? or s.role like ? or voucherCode like ? or paymentMethod like ? or b.status like ? or u.name like ? or u.phone like ? or u.email like ? or s.phone like ? order by b.serviceDate desc`,
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
                            let userPaymentMethod = null;
                            
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
                                    country : row.country,
                                    latitude : row.latitude,
                                    longitude : row.longitude,
                                    imageUrl : row.imageUrl,
                                    fcmToken: row.fcmToken,
    
                                };
                            }

                            if(row.paymentMethodId)
                            {
                                userPaymentMethod = {
                                    id: row.paymentMethodId,
                                    cardNumber: row.cardNumber,
                                    expiryDate: row.expiryDate,
                                    cvv: row.cvv,
                                    description: row.methodDescription,
                                };
                            }
                            booking = {
                                bookingId: row.bookingId, 
                                bookingCode: row.bookingCode, 
                                userId: row.userId, 
                                addressId: row.addressId, 
                                instructions: row.instructions, 
                                frequency: row.frequency, 
                                hours: row.hours, 
                                professionals: row.professionals, 
                                includeMaterial: row.includeMaterial, 
                                voucherCode: row.voucherCode, 
                                subTotal: row.subTotal, 
                                tax: row.tax, 
                                voucherPrice: row.voucherPrice, 
                                serviceFee: row.serviceFee, 
                                materialCost: row.materialCost, 
                                creditPoints: row.creditPoints, 
                                discount: row.discount, 
                                netTotal: row.netTotal, 
                                discountDescription: row.discountDescription, 
                                paymentMethod: row.paymentMethod, 
                                userMethodId: row.userMethodId, 
                                paymentRemarks: row.paymentRemarks, 
                                serviceDate: row.serviceDate, 
                                status: row.status, 
                                createAt: row.createAt, 
                                updateAt: row.updateAt, 
                                cancelReason: row.cancelReason, 
                                cancelledAt: row.cancelledAt,
                                paymentReceived: row.paymentReceived,
                                user : user,
                                address : address,
                                userPaymentMethod: userPaymentMethod,
                                staff : [],
                                items: [], 
                                tasks: [],
                                check_activities: []
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
                                    bookingDate: row.createAt,
                                    serviceDate: row.serviceDate,
                                };
                                booking.items.push(item);
                            }
                    
                        }
    
                        if(row.taskId != null)
                        {
                            let task = booking.tasks.find((s) => s.id === row.taskId);
    
                            if (!task) {
                                task = {
                                    id: row.taskId,
                                    staffId: row.taskStaffId,
                                    title: row.taskTitle,
                                    description: row.taskDescription,
                                    status: row.taskStatus,
                                    createAt: row.taskCreateAt,
                                    completeAt: row.taskCompleteAt
                                };
                                booking.tasks.push(task);
                            }
                    
                        }

                        if(row.checkId != null)
                        {
                            let activity = booking.check_activities.find((c) => c.id === row.checkId);
    
                            if (!activity) {
                                activity = {
                                    id: row.checkId,
                                    bookingId: row.bookingId,
                                    staffId: row.staffId,
                                    checkedIn: row.checkedIn,
                                    checkedInLocation: row.checkedInLocation,
                                    checkedOut: row.checkedOut,
                                    checkedOutLocation: row.checkedOutLocation,
                                };
                                booking.check_activities.push(activity);
                            }
                    
                        }

                        if(row.staffId != null)
                        {
                            let s = booking.staff.find((c) => c.staffId === row.staffId);
    
                            if (!s) {
                                s = {
                                    staffId: row.staffId,
                                    name: row.staffName,
                                    phone: row.staffPhone,
                                    email: row.staffEmail,
                                    gender: row.staffGender,
                                    imageUrl: row.staffImageUrl,
                                    fcmToken: row.staffFcmToken,
                                    role: row.role,
                                    serviceDate: row.serviceDate
                                };
                                booking.staff.push(s);
                            }
                    
                        }
                    
                }
                return callback(null, bookings);
                }
         });
    },

    getDateWiseBookings : (data, callback) => {
        var startDate = data.startDate;
        var endDate = data.endDate;
        pool.query(`Select
        b.bookingId, 
        bookingCode, 
        b.userId, 
        addressId, 
        instructions, 
        frequency, 
        hours, 
        professionals, 
        includeMaterial, 
        voucherCode, 
        subTotal, 
        tax, 
        voucherPrice, 
        serviceFee, 
        materialCost, 
        b.creditPoints, 
        discount, 
        netTotal, 
        discountDescription, 
        paymentMethod, 
        userMethodId, 
        paymentRemarks, 
        b.serviceDate, 
        b.status, 
        b.createAt, 
        b.updateAt, 
        cancelReason, 
        cancelledAt,
        paymentReceived,
        
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
        u.country,
        u.latitude,
        u.longitude,
        u.imageUrl,
        u.fcmToken,
        
        addressId, 
        a.latitude as addressLatitude,
        a.longitude as addressLongitude,
        a.description as addressDescription,

        c.id as checkId,
        checkedIn,
        checkedInLocation,
        checkedOut,
        checkedOutLocation,
        
        p.id as assignId,
		professionalId,
        assignDate,
        modifiedAt,
        
        s.staffId,
        s.name as staffName,
        s.phone as staffPhone,
        s.email as staffEmail,
        s.gender as staffGender,
        s.imageUrl as staffImageUrl,
        s.fcmToken as staffFcmToken,
        s.role,
        
        t.id as taskId, 
        t.staffId as taskStaffId,
        title as taskTitle, 
        t.description as taskDescription, 
        t.status as taskStatus, 
        t.createAt as taskCreateAt, 
        t.completeAt as taskCompleteAt,
        
        m.id as paymentMethodId,
		cardNumber, 
        expiryDate, 
        cvv, 
        m.description as methodDescription
        
        from bookings b 
        left join booking_items i on b.bookingId = i.bookingId
        left join users u on b.userId = u.id
        left join addresses a on b.addressId = a.id
        left join booking_professionals p on b.bookingId = p.bookingId
        left join staff s on p.professionalId = s.staffId
        left join staff_check_activities c on b.bookingId = c.bookingId
        left join tasks t on b.bookingId = t.bookingId
        left join user_payment_methods m on m.id = b.userMethodId
         where b.status != 'Cancelled' and b.serviceDate between ? and ? order by b.serviceDate desc`,
         [`${startDate}`, `${endDate}`], 
         (error, results, fields)=> {
            if(error)
                {
                    console.log("Error in date-wise booking");
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
                            let userPaymentMethod = null;
                            
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
                                    country : row.country,
                                    latitude : row.latitude,
                                    longitude : row.longitude,
                                    imageUrl : row.imageUrl,
                                    fcmToken: row.fcmToken,
    
                                };
                            }

                            if(row.paymentMethodId)
                            {
                                userPaymentMethod = {
                                    id: row.paymentMethodId,
                                    cardNumber: row.cardNumber,
                                    expiryDate: row.expiryDate,
                                    cvv: row.cvv,
                                    description: row.methodDescription,
                                };
                            }
                            booking = {
                                bookingId: row.bookingId, 
                                bookingCode: row.bookingCode, 
                                userId: row.userId, 
                                addressId: row.addressId, 
                                instructions: row.instructions, 
                                frequency: row.frequency, 
                                hours: row.hours, 
                                professionals: row.professionals, 
                                includeMaterial: row.includeMaterial, 
                                voucherCode: row.voucherCode, 
                                subTotal: row.subTotal, 
                                tax: row.tax, 
                                voucherPrice: row.voucherPrice, 
                                serviceFee: row.serviceFee, 
                                materialCost: row.materialCost, 
                                creditPoints: row.creditPoints, 
                                discount: row.discount, 
                                netTotal: row.netTotal, 
                                discountDescription: row.discountDescription, 
                                paymentMethod: row.paymentMethod, 
                                userMethodId: row.userMethodId, 
                                paymentRemarks: row.paymentRemarks, 
                                serviceDate: row.serviceDate, 
                                status: row.status, 
                                createAt: row.createAt, 
                                updateAt: row.updateAt, 
                                cancelReason: row.cancelReason, 
                                cancelledAt: row.cancelledAt,
                                paymentReceived: row.paymentReceived,
                                user : user,
                                address : address,
                                userPaymentMethod: userPaymentMethod,
                                staff : [],
                                items: [], 
                                tasks: [],
                                check_activities: []
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
                                    bookingDate: row.createAt,
                                    serviceDate: row.serviceDate,
                                };
                                booking.items.push(item);
                            }
                    
                        }
    
                        if(row.taskId != null)
                        {
                            let task = booking.tasks.find((s) => s.id === row.taskId);
    
                            if (!task) {
                                task = {
                                    id: row.taskId,
                                    staffId: row.taskStaffId,
                                    title: row.taskTitle,
                                    description: row.taskDescription,
                                    status: row.taskStatus,
                                    createAt: row.taskCreateAt,
                                    completeAt: row.taskCompleteAt
                                };
                                booking.tasks.push(task);
                            }
                    
                        }

                        if(row.checkId != null)
                        {
                            let activity = booking.check_activities.find((c) => c.id === row.checkId);
    
                            if (!activity) {
                                activity = {
                                    id: row.checkId,
                                    bookingId: row.bookingId,
                                    staffId: row.staffId,
                                    checkedIn: row.checkedIn,
                                    checkedInLocation: row.checkedInLocation,
                                    checkedOut: row.checkedOut,
                                    checkedOutLocation: row.checkedOutLocation,
                                };
                                booking.check_activities.push(activity);
                            }
                    
                        }

                        if(row.staffId != null)
                        {
                            let s = booking.staff.find((c) => c.staffId === row.staffId);
    
                            if (!s) {
                                s = {
                                    staffId: row.staffId,
                                    name: row.staffName,
                                    phone: row.staffPhone,
                                    email: row.staffEmail,
                                    gender: row.staffGender,
                                    imageUrl: row.staffImageUrl,
                                    fcmToken: row.staffFcmToken,
                                    role: row.role,
                                    serviceDate: row.serviceDate
                                };
                                booking.staff.push(s);
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
    },

    updateBookingPaymentStatus: (data, callback) =>{
        const now = new Date();
        data.updateAt = now;
        pool.query(`update bookings set paymentReceived = ?, updateAt = ? where bookingId = ?`,
        [data.paymentReceived, data.updateAt, data.bookingId], 
        (error, results, fields)=> {
           if(error)
               {
                   return callback(error);
               }
           return callback(null, results);
        });
    },

    updateBookingProfessional: (data, callback) =>{
        const now = new Date();
        data.modifiedAt = now;
        pool.query(`update booking_professionals set professionalId = ?, modifiedAt = ? where id = ?`,
        [data.professionalId, data.modifiedAt, data.id], 
        (error, results, fields)=> {
           if(error)
               {
                   return callback(error);
               }
           return callback(null, results);
        });
    },

    deleteBookingProfessional: (data, callback) =>{
        const now = new Date();
        data.modifiedAt = now;
        pool.query(`delete form booking_professionals where id = ?`,
        [data.id], 
        (error, results, fields)=> {
           if(error)
               {
                   return callback(error);
               }
           return callback(null, results);
        });
    },

}
