const { createBooking, getBooking, getAllBookings } = require('../controllers/bookingController');
const router = require('express').Router();
const { verifyUser, verifyAdmin } = require('../utils/verifyToken');

// create booking
router.post('/', verifyUser, createBooking);
// get single booking
router.get('/:id', verifyUser, getBooking);
// get all bookings
router.get('/', verifyAdmin, getAllBookings);

module.exports = router;