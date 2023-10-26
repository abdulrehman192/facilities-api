// imports
//need to install express package
require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const multer = require('multer');

// initiate express 
const app = express();
app.use(express.json({ limit: '50mb' }))
app.use(multer().any());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

//end points

app.get("/api", (request, response)=> {

    response.json(
        {
            success : 1,
            message : "This is the rest api response"
        }
    );
});

//users end points
const userRouter = require("./api/users/user.router");
const userAddressRouter = require("./api/addresses/address.router");
const userPaymentMethodRouter = require("./api/user-payment-methods/method.router");
const serviceCategoriesRouter = require("./api/service-categories/category.router");
const servicesRouter = require("./api/services/service.router");
const servicessubCategoriesRouter = require("./api/service-sub-categories/sub-category.router");
const subServicesRouter = require("./api/sub-services/sub.service.router");
const reviewsRouter = require("./api/reviews/review.router");
const vouchersRouter = require("./api/vouchers/voucher.router");
const bookingsRouter = require("./api/bookings/booking.router");


app.use("/api/auth", userRouter);
app.use("/api/user", userAddressRouter);
app.use("/api/user", userPaymentMethodRouter);
app.use("/api", serviceCategoriesRouter);
app.use("/api", servicesRouter);
app.use("/api", servicessubCategoriesRouter);
app.use("/api", subServicesRouter);
app.use("/api", vouchersRouter);
app.use("/api/user", reviewsRouter);
app.use("/api/user", bookingsRouter);

app.listen(process.env.APP_PORT || 4000, ()=> {
    console.log("Server is running on port : ", process.env.APP_PORT);
});
