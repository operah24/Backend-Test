const express = require('express');
const { registerUser, login } = require('../controllers');
const validate = require('../middleware/validator');

const router = new express.Router();

router.post('/register', validate, registerUser);
router.post('/login', validate, login);

module.exports = router;
