const express = require('express');
const { uploadFile, getFileById } = require('../controllers');

const isUser = require('../middleware/isUser');

const router = new express.Router();
router.post('/assignment', isUser,uploadFile);
router.get('/assignment/:id', getFileById);
module.exports = router;
