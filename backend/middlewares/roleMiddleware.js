const  { responseMessages } = require('../utils/constants');
const  {formatMessage}  = require('../utils/messageFormatter');

const roleMiddleware = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            const message = formatMessage(responseMessages.error.denied,{operation:'Access'})
            return res.status(403).send(message);
        }
        next();
    };
};

module.exports = {roleMiddleware};