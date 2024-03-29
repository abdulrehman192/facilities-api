// imports
//need to install express package
require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');

// initiate express 
const app = express();
app.use(cors());
// const allowedOrigins = [process.env.BASE_URL, 'http://localhost:61703/'];
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: 'GET,PUT,PATCH,POST,DELETE',
//   optionsSuccessStatus: 204,
// };

// app.use(cors(corsOptions));
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
const userCreditsRouter = require("./api/credits/credits.router");
const userPaymentMethodRouter = require("./api/user-payment-methods/method.router");
const serviceCategoriesRouter = require("./api/service-categories/category.router");
const servicesRouter = require("./api/services/service.router");
const servicessubCategoriesRouter = require("./api/service-sub-categories/sub-category.router");
const subServicesRouter = require("./api/sub-services/sub.service.router");
const reviewsRouter = require("./api/reviews/review.router");
const vouchersRouter = require("./api/vouchers/voucher.router");
const bookingsRouter = require("./api/bookings/booking.router");
const staffRouter = require("./api/staff/staff.router");
const taskRouter = require("./api/tasks/task.router");
const notificationRouter = require("./api/notifications/notification.router");
const checkRouter = require("./api/staff-check-activities/activity.router");


app.use("/api/auth", userRouter);
app.use("/api/user", userAddressRouter);
app.use("/api/user", userCreditsRouter);
app.use("/api/user", userPaymentMethodRouter);
app.use("/api", serviceCategoriesRouter);
app.use("/api", servicesRouter);
app.use("/api", servicessubCategoriesRouter);
app.use("/api", subServicesRouter);
app.use("/api", vouchersRouter);
app.use("/api/user", reviewsRouter);
app.use("/api/user", bookingsRouter);
app.use("/api/staff", staffRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/notifications", notificationRouter);
app.use("/api/checks", checkRouter);

app.listen(process.env.APP_PORT || 4000, ()=> {
    console.log("Server is running on port : ", process.env.APP_PORT);
});
