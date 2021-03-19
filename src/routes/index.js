const express = require('express');
const userRoutes = require('./user');
const fileRoutes = require('./file');
const compareRoutes = require('./compare');

const router = new express.Router();
router.use('/auth', userRoutes);
router.use('/upload', fileRoutes);
router.use('/', compareRoutes);

module.exports = router;
