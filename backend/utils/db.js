const mongoose = require('mongoose');

const mongooseConnection =  mongoose.connect(process.env.MONGODB_URI);

module.exports = { mongooseConnection };