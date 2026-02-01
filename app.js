const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const ExpressError = require('./Utils/ExpressError');
const methodOverride = require('method-override');


const campgrounds = require('./routes/campgrounds');
const reviews = require('./routes/review');


mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
  .then(() => {
    console.log('Database connected');
  })
  .catch(err => {
    console.error('connection error:', err);
  });

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/campgrounds', campgrounds);
app.use('/campgrounds/:id/reviews', reviews);

app.get('/', (req, res) => {
  res.render('home');
});

app.all(/(.*)/, (req, res, next) => {
  next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Something went wrong!';
  res.status(statusCode).render('error', { err });
});

// app.get('/makecampground', async (req, res) => {
//     const camp = new Campground({ title: 'My Backyard', description: 'Cheap Camping' });
//     await camp.save();
//     res.send(camp);
// });

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});