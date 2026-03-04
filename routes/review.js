const express = require('express');
const router = express.Router({ mergeParams: true });
const reviews = require('../controllers/reviews');
const catchAsync = require('../Utils/catchAsync');
const ExpressError = require('../Utils/ExpressError');
const Campground = require('../models/campground');
const Review = require('../models/review');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');



router.post('/:id/reviews', isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete('/:id/reviews/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.destroyReview));

module.exports = router;