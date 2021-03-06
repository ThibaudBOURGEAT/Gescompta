const mongoose = require('mongoose');
const relationship = require("mongoose-relationship");

const command_schema = new mongoose.Schema({
    user: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        childPath: "command"
    }],
    products: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Product'
    }],
    deleted: {
        type: Boolean,
        default: false,
    }
}, { usePushEach: true });
command_schema.plugin(relationship, { relationshipPathName:'user' });

module.exports = mongoose.model('Command', command_schema);
