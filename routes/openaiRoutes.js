const express = require('express');
const { correctEnglish } = require('../controllers/openaiController');
const router = express.Router();

router.post('/generateimage', correctEnglish);

module.exports = router;