const express = require('express');
const { toggleUserTracking } = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/toggle-tracking', toggleUserTracking);

module.exports = router;