const EventEmitter = require('events');

class UserEventEmitter extends EventEmitter {}
const userEventEmitter = new UserEventEmitter();
const triggerUserActiveEvent = (userData) => {
    userEventEmitter.emit('user_active', userData);
};
const setUserActive = (data) => {
    const userData = {
        userId: data.id,
        username: data.username,
        role: data.role
    };
    triggerUserActiveEvent(userData);
};
module.exports = { userEventEmitter, setUserActive };
