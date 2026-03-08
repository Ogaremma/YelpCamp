const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../Utils/catchAsync');
const Campground = require('../models/campground');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.route('/')
    .get(catchAsync(campgrounds.index))
    //  .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));
    .post(upload.single('image'), (req, res) => {
        console.log(req.body, req.file);
        res.send('It Worked');
    })

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.destroyCampground));


router.get('/:id/update', isLoggedIn, isAuthor, catchAsync(campgrounds.renderUpdateForm));

module.exports = router;