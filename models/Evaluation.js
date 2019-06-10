const mongoose = require('mongoose');

const EvaluationSchema = new mongoose.Schema({
    // Have into consideration that we need date and time
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    env: {
        type: String,
        required: true
    },
    shift: {
        type: String,
        required: true
    },
    adverseEffects: {
        type: String
    },
    evaluator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    rescue: {
        lock: {
            type: {
                type: String,
                required: true
            },
            drugs: [
                {
                    name: {
                        type: String,
                        required: true
                    },
                    dose: {
                        type: String,
                        required: true
                    }
                }
            ]
        },
        infusionPump: {
            totalVolume: {
                type: String,
                required: true
            },
            infusionRate: {
                type: Number,
                required: true
            },
            drugs: [
                {
                    name: {
                        type: String,
                        required: true
                    },
                    dose: {
                        type: String,
                        required: true
                    }
                }
            ]
        }
    },
    notes: {
        type: String
    },
});

module.exports = Evaluation = mongoose.model('evaluation', EvaluationSchema);