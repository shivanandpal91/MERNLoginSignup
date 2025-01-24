require('./User');
const mongoose = require('mongoose');


const mongoose_url=process.env.MONGO_CONN;

mongoose.connect(mongoose_url)
  .then(() => {
    console.log('Connected to MongoDB')
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
})