const express = require('expresss');
const catchAsync = require('../Utils/catchAsync');
const router = express.Router();
const ExpressError = require('../Utils/ExpressError');
const Campground = require('../models/campground');
const { campgroundSchema } = require('../schema');

const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
};

router.get('/', catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
}));

router.get('/new', (req, res) => {
    res.render('campgrounds/new');
});

router.post('/', validateCampground, catchAsync(async (req, res, next) => {
    //if (!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
}));

// this is the route for the show page
router.get('/:id', catchAsync(async (req, res, next) => {
    const campground = await Campground.findById(req.params.id).populate('reviews');
    console.log(campground)
    if (!campground) {
        // campground not found → throw 404 error
        return next(new ExpressError('Page Not Found', 404));
    }
    res.render('campgrounds/show', { campground });
}));

router.get('/:id/update', catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);

    if (!campground) {
        return next(new ExpressError('Campground Not Found', 404));
    }

    res.render('campgrounds/update', { campground });
}));

router.put('/:id', validateCampground, catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
}));

router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
}));

module.exports = router;