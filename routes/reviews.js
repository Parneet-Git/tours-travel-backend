const { createReview } = require('../controllers/reviewController');
const router = require('express').Router();
const { verifyUser } = require('../utils/verifyToken');

// add review for particular hotel
router.post('/:tourId', verifyUser, createReview);

module.exports = router;