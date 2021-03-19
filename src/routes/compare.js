const express = require('express');
const { compare, getAllResults, rerun } = require('../controllers/compare');

const router = new express.Router();

router.post('/compare', compare);
router.get('/results', getAllResults);
router.patch('/results/:id/rerun', rerun)

module.exports = router;
