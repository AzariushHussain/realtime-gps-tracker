const express = require('express');
const { getLastLocationOfUser, getLastNLocationOfAUser } = require('../controllers/locationController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { roleMiddleware } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware('admin'));

router.get('/last-location/:userId', getLastLocationOfUser);
router.get('/last-n-location/:userId', getLastNLocationOfAUser);

module.exports = router;