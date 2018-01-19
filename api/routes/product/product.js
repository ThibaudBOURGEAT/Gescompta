const router = require('express').Router();
const Product = require('../../models/Product');

router.get('/:id', function(req,res){
    Product.findOne({_id: req.params.id}).then(function(product){
        res.json(product);
    });
});

router.get('/getAll', function(req,res){
    Product.find().then(function(products){
        res.json(products);
    });
});

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

router.put('/update', function(req,res){
    var description = req.body.description;
    var price = req.body.price;

    Product.findOne({wording: req.body.wording, deleted: false}).then(function(product){
        if(!description){ description = product.description;}
        if(!price){ price = product.price;}

        product.update({
            $set: {
                description: description,
                price: price
            }
        }, function(err){
            if(err){res.json({success: false, message: 'Error'});}
            else{res.json({success: true, message: 'Product update !'});}
        });
    });
});

router.delete('/softdelete', function(req, res) {
    Product.find({_id: req.body.id})
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
                    message: 'Product softdelete !'
                });
            }
        })
});


module.exports = router;
