const router = require('express').Router();
const { createTour, deleteTour, updateTour, getSingleTour, getAllTours, getTourBySearch, getFeaturedTours, getToursCount } = require('../controllers/tourController');
const { verifyAdmin } = require('../utils/verifyToken');

// create new tour
router.post('/', verifyAdmin, createTour);
// update tour
router.put('/:id', verifyAdmin, updateTour);
// delete tour
router.delete('/:id', verifyAdmin, deleteTour);
// get single tour
router.get('/:id', getSingleTour);
// get all tours
router.get('/', getAllTours);
// get tours by search
router.get('/search/getToursBySearch', getTourBySearch);
// get featured tours
router.get('/search/getFeaturedTours', getFeaturedTours);
// get tours count
router.get('/search/getToursCount', getToursCount);

module.exports = router