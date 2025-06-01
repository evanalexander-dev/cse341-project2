const router = require('express').Router();
const passport = require('passport');

router.use('/bugs', require('./bugs'));
router.use('/projects', require('./projects'));

module.exports = router;