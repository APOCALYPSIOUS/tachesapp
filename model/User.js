const mongoose = require('mongoose');

const usershema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
},{ timestamps: true });

module.exports = mongoose.model('User', usershema);