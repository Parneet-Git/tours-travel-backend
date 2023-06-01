const Review = require('../models/Review');
const Tour = require('../models/Tour');

// create review
const createReview = async (req, res) => {
    const tourId = req.params.tourId;
    const newReview = new Review({ ...req.body });

    try {
        const savedReview = await newReview.save();

        // after adding a review, update the reviews array of Tour
        await Tour.findByIdAndUpdate(tourId, {
            $push: { reviews: savedReview._id }
        });

        res.status(201).send({ success: true, message: 'Successfully added review', data: savedReview });
    } catch (err) {
        res.status(500).send({ success: false, message: 'Failed to add review', err });
    }
}

module.exports = {
    createReview
}