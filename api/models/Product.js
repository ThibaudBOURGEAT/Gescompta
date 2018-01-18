const mongoose = require('mongoose');
const relationship = require("mongoose-relationship");

const product_schema = new mongoose.Schema({
    wording: {
        type: String,
        required: true,
        index: {
            unique: true,
        },
        minlength: 2,
        maxlength: 40,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type:Number,
        required: true
    },
    commands: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Command',
        childPath: "product"
    }],
    deleted: {
        type: Boolean,
        default: false,
    }
}, { usePushEach: true });

product_schema.plugin(relationship, { relationshipPathName:'commands' });

module.exports = mongoose.model('Product', product_schema);
