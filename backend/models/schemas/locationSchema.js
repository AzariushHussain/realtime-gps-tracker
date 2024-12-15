const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
    user: { type: String, required: true },
    address: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
},
{
    timestamps: true,
}
)

module.exports = {locationSchema}