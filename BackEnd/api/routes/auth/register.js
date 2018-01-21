const router = require('express').Router();
const User = require('../../models/User');
const Command = require('../../models/Command');
const hash = require('../../../helpers/hash');

router.post('/', function(req,res){
    const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        login: req.body.login,
        address: req.body.address,
        password: hash.hashPassword(req.body.password)
    })

    newUser.save(function(err){
        if(err) throw err;
    });
    const newCommand = new Command({user: newUser._id});
    newCommand.save(function(err){
        if(err) throw err;
        res.json({success: true, message: 'Account created !'});
    });
});

module.exports = router;
