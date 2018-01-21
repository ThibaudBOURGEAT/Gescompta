const router = require('express').Router();
const User = require('../../models/User');
const hash = require('../../../helpers/hash');

router.get('/', function(req,res){
    res.json(req.user);
});

router.put('/update', function(req,res){
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var address = req.body.address;
    var password = hash.hashPassword(req.body.password);

    User.findOne({login: req.user.login, deleted: false}).then(function(user){
        if(!firstname){ firstname = user.firstname;}
        if(!lastname){ lastname = user.lastname;}
        if(!address){ lastname = user.address;}
        if(!password){password = user.password;}

        user.update({
            $set: {
                firstname: firstname,
                lastname: lastname,
                address: address,
                password: password
            }
        }, function(err){
            if(err){res.json({success: false, message: 'Error'});}
            else{res.json({success: true, message: 'Account update !'});}
        });
    });
});

router.delete('/softdelete', function(req, res) {
    User.find({login: req.body.login})
        .update({
            deleted: true
        }, function(err) {
            if (err) {
                res.json({
                    success: false,
                    message: 'Error'
                });
            } else {
                res.json({
                    success: true,
                    message: 'Account softdelete !'
                });
            }
        })
});

module.exports = router;
