const { createUser, getUserByUsername } = require('../models/userModel')
const { successResponse, errorResponse } = require('../utils/response')
const { formatMessage } = require('../utils/messageFormatter')
const { responseMessages } = require('../utils/constants')
const { setUserActive } = require('../utils/userEventEmitter')
const jwt = require('jsonwebtoken');
const EventEmitter = require('events');

const bcrypt = require('bcrypt');
const saltRounds = 10; 

const registerUser = async (req, res) => {
    console.log("registerUser:", req.body);
    const { username, password, role } = req.body
    try {
        if(!username || !password){
            const message = formatMessage(responseMessages.error.invalidInput, { operation: 'Username or Password' })
            return errorResponse(message, 400)
        }
        let user = await getUserByUsername(username)
        console.log("user:", user);
        if(user){
            const message = formatMessage(responseMessages.error.alreadyExists, { username })
            return errorResponse(res, message, 400)
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const payload = { username, password: hashedPassword }
        if (role) payload.role = role
        user = await createUser(payload)
        user = user.toObject()
        delete user.password
        const message = formatMessage(responseMessages.success.created, { operation: 'User' })
        return successResponse(res, message, user)
    } catch (error) {
        console.error(error);
        const message = formatMessage(responseMessages.error.internalServerError)
        return errorResponse(res, message)
    }
}


const loginUser = async (req, res) => {
    const { username, password } = req.body
    try {
        if(!username || !password){
            const message = formatMessage(responseMessages.error.invalidInput, { operation: 'Username or Password' })
            return errorResponse(res, message, 400)
        }
        let user = await getUserByUsername(username)
        if(!user){
            const message = formatMessage(responseMessages.error.notFound, { operation: 'User' })
            return errorResponse(res, message, 404)
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            const message = formatMessage(responseMessages.error.invalidInput, { operation: 'Password' })
            return errorResponse(res, message, 400)
        }
        payload = { id: user._id, username: user.username, role: user.role , isTracking: user.isTracking }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });
        user = user.toObject()
        delete user.password
        const message = formatMessage(responseMessages.success.fetched, { operation: 'User' })
        return successResponse(res, message, { token, user })
    } catch (error) {
        console.error(error);
        const message = formatMessage(responseMessages.error.internalServerError)
        return errorResponse(res, message)
    }
}


module.exports = { registerUser, loginUser }