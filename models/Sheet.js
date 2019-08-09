const mongoose      = require('mongoose');
const SheetSchema   = new mongoose.Schema({
    creationDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    dischargeDate: {
        type: Date
    },
    discharged: {
        type: Boolean,
        default: false,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    institution: {
        type: String,
        required: true
    },
    patient: {
        name: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        age: {
            // TODO add the unit (años, meses), this shoudl be an object
            type: Number,
            required: true,
        },
        weight: {
            type: Number,
            required: true
        },
        medicalHistoryNumber: {
            type: Number,
            required: true
        },
        diagnosisSurgery: {
            type: String,
            required: true
        },
        pathologicalBackground: {
            type: String
        }
    },
    // TODO add inside patient
    room: {
        type: String,
        required: true
    },
    lock: {
        // TODO should change to array of strings
        // TODO add totalVolume should be a number
        type: {
            type: String
        },
        drugs: [
            {
                name: {
                    type: String
                },
                // TODO dose should be a number
                dose: {
                    type: String
                }
            }
        ]
    },
    infusionPump: {
        // TODO totalVolume should be a number
        totalVolume: {
            type: String
        },
        infusionRate: {
            type: Number
        },
        drugs: [
            {
                name: {
                    type: String
                },
                // TODO dose should be a number
                dose: {
                    type: String
                }
            }
        ]
    },
    evaluations: [
        {
            creationDate: {
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
                        type: String
                    },
                    drugs: [
                        {
                            name: {
                                type: String
                            },
                            dose: {
                                type: String
                            }
                        }
                    ]
                },
                infusionPump: {
                    totalVolume: {
                        type: String
                    },
                    infusionRate: {
                        type: Number
                    },
                    drugs: [
                        {
                            name: {
                                type: String
                            },
                            dose: {
                                type: String
                            }
                        }
                    ]
                }
            },
            note: {
                type: String
            }
        }
    ]
});

module.exports = Sheet = mongoose.model('sheet', SheetSchema);