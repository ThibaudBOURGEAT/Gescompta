const router = require('express').Router();

router.use('/', require('./auth'));
router.use('/register', require('./register'));

module.exports = router ;
