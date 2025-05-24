const router = require('express').Router();

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hello, world!');
});

router.use('/bugs', require('./bugs'));
router.use('/projects', require('./projects'));

module.exports = router;