const router = require('express').Router();
const Command = require('../../models/Command');
const Product = require('../../models/Product');

router.post('/addProduct', function(req,res){
    Command.findOne({_id: req.user.command[0]}).then(function(command){
        Product.findOne({_id: req.body.id}).then(function(product){
            product.commands.push(command._id);
            product.save(function(){
                command.products.push(product._id);
                command.save(function(err){
                    if(err){res.json({success: false, message: 'Error'});}
                    else{res.json({success: true, message: 'Product add to command !'});}
                });
            });
        });
    });
});

router.get('/getProducts', function(req,res){
    Command.findOne({_id: req.user.command[0]}).populate('products')
    .then(function(command){
        res.json(command.products);
    }).catch(function(err){
        if(err){res.json({success: false, message: "Can't return products."});}
    });
});

router.post('/removeProduct', function(req,res){
    Command.findOne({_id: req.user.command[0]}).then(function(command){
        Product.findOne({_id: req.body.id}).then(function(product){
            product.commands.pull(command._id);
            product.save(function(){
                command.products.pull(product._id);
                command.save(function(err){
                    if(err){res.json({success: false, message: 'Error'});}
                    else{res.json({success: true, message: 'Product remove to command !'});}
                });
            });
        });
    });
});


module.exports = router;
