const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
dotenv.config();

// fetching routes
const authRoute = require('./routes/auth');
const tourRoute = require('./routes/tours');
const userRoute = require('./routes/users');
const reviewRoute = require('./routes/reviews')
const bookingRoute = require('./routes/bookings');
const imageRoute = require('./routes/image');

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
    origin: true,
    credentials: true
}

// connecting database
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log('MongoDB database connected');
}).catch((error) => {
    console.log('MongoDB database connection failed', error);
});

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// routes path and redirecting...
const routePath = '/api/v1';
app.use(`${routePath}/auth`, authRoute);
app.use(`${routePath}/tours`, tourRoute);
app.use(`${routePath}/users`, userRoute);
app.use(`${routePath}/review`, reviewRoute);
app.use(`${routePath}/booking`, bookingRoute);
app.use(`${routePath}/image`, imageRoute);

// listening at PORT : 5000
app.listen(PORT, () => {
    console.log(`server runnin on ${PORT}\nhttp://localhost:${PORT}`);
})