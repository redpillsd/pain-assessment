const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    medicalRegistrationNumber: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    /* role: {
    
    }, */
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', UserSchema);