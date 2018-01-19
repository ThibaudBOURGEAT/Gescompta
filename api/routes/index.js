const router = require('express').Router();
const passport = require('passport');

router.use('/user', passport.authenticate('jwt', {session: false}), require('./user'));
router.use('/auth', require('./auth'));
router.use('/product', /*passport.authenticate('jwt', {session: false}),*/ require('./product'));
router.use('/command', passport.authenticate('jwt', {session: false}), require('./command'));

module.exports = router ;
