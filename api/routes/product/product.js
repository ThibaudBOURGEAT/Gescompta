const router = require('express').Router();
const Product = require('../../models/Product');
const Command = require('../../models/Command');

router.post('/create', function(req,res){
    const newProduct = new Product({
        wording: req.body.wording,
        description: req.body.description,
        price: req.body.price
    })

    newProduct.save(function(err){
        if(err) throw err;
        res.json({success: true, message: 'Product created !'});
    });
});
module.exports = router;
