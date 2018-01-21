const mongoose = require('mongoose');

const user_schema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    login: {
        type: String,
        required: true,
        match: [/^[a-zA-Z0-9]{3,12}$/, 'only between 3 and 12 digits or letters !!!!!'],
        index: {
            unique: true
        }
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    command: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Command'
    }],
    deleted: {
        type: Boolean,
        default: false,
    }
}, { usePushEach: true });

module.exports = mongoose.model('User', user_schema);
