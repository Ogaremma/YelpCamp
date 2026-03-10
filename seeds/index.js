const mongoose = require('mongoose');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
  .then(() => {
    console.log('Database connected');
  })
  .catch(err => {
    console.error('connection error:', err);
  });

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const seed = random1000;
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '69a171eafdbc487d116d8cc5',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.',
      price,
      images: [
        {
          url: 'https://res.cloudinary.com/dgz77yqem/image/upload/v1773102433/Yelpcamp/vl656mbpgd0buo2cdtwp.png',
          filename: 'Yelpcamp/vl656mbpgd0buo2cdtwp'
        },
        {
          url: 'https://res.cloudinary.com/dgz77yqem/image/upload/v1773102433/Yelpcamp/vl656mbpgd0buo2cdtwp.png',
          filename: 'Yelpcamp/vl656mbpgd0buo2cdtwp'
        }
      ],
    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
});