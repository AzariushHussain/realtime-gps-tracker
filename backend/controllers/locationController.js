const { 
        getLastLocation,
        getLastNLocationOfUser,
    } = require('../models/locationModel');
const { successResponse, errorResponse } = require('../utils/response');
const { formatMessage } = require('../utils/messageFormatter');
const { responseMessages } = require('../utils/constants');

const getLastLocationOfUser = async (req, res, userId) => {
    try {
        const location = await getLastLocation(userId);
        if (!location) {
            const message = formatMessage(responseMessages.error.notFound, { operation: 'Location' });
            return errorResponse(res, message, 400);
        }
        const message = formatMessage(responseMessages.success.retrieved, { operation: 'Location' });
        return successResponse(res, message, location);
    } catch (error) {
        const message = formatMessage(responseMessages.error.internalServerError);
        return errorResponse(res, message);
    }
}


const getLastNLocationOfAUser = async (req, res, userId) => {
    //returns last 10 locations if  count not provided
    const { count } = req.params;
    try {
        const locations = await getLastNLocationOfUser(userId, count);
        if (!locations) {
            const message = formatMessage(responseMessages.error.notFound, { operation: 'Location' });
            return errorResponse(res, message, 400);
        }
        const message = formatMessage(responseMessages.success.retrieved, { operation: 'Location' });
        return successResponse(res, message, locations);
    } catch (error) {
        const message = formatMessage(responseMessages.error.internalServerError);
        return errorResponse(res, message);
    }
}

module.exports = {
    getLastLocationOfUser,
    getLastNLocationOfAUser
};