const router = require('express').Router();

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hello, world!');
});

router.use('/bugs', require('./bugs'));

module.exports = router;