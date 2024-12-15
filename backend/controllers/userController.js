const { toggleTracking } = require('../models/userModel');
const { successResponse, errorResponse } = require('../utils/response');
const { formatMessage } = require('../utils/messageFormatter')
const { responseMessages } = require('../utils/constants')


const toggleUserTracking = async (req, res) => {
    const { role, id: currentUserId } = req.user;
    const { userId: paramUserId } = req.params;
    const userId = role === 'admin' ? paramUserId : currentUserId;
    try {
        const user = await toggleTracking(userId);
        if (!user) {
            const message = formatMessage(responseMessages.error.notFound, { operation: 'User' });
            return errorResponse(res, message, 400);
        }
        const  message = formatMessage(responseMessages.success.toggled, { operation: 'User tracking' });
        return successResponse(res, message, user);
    } catch (error) {
        const message = formatMessage(responseMessages.error.internalServerError);
        return errorResponse(res, message);
    }
}

module.exports = {
    toggleUserTracking
};