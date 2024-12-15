const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoute');
const userRoutes = require('./userRoute');
const LocationRoutes = require('./LocationRoute');

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/location', LocationRoutes);

module.exports = router;