const mongoose = require('mongoose')
const { userSchema } = require('./schemas/userSchema')
const { locationSchema } = require('./schemas/locationSchema')

const UserModel = mongoose.model('User', userSchema)
const LocationModel = mongoose.model('Location', locationSchema)

module.exports = {
    UserModel,
    LocationModel
}