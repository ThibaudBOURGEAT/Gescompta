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

    if(!firstname){ firstname = req.user.firstname;}
    if(!lastname){ lastname = req.user.lastname;}
    if(!address){ lastname = req.user.address;}
    if(!password){password = req.user.password;}

    User.find({login: req.user.login, deleted: false}).update({
        $set: {
            firstname: firstname,
            lastname: lastname,
            password: password
        }
    }, function(err){
        if(err){res.json({success: false, message: 'Error'});}
        else{res.json({success: true, message: 'Account update !'});}
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
