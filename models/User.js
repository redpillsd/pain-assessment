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
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true,
        required: true
    },
    role: {
        type: String,
        default: 'USER',
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    lastTimeEdited: {
        type: Date
    }
});

module.exports = User = mongoose.model('user', UserSchema);