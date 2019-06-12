const express                       = require('express');
const router                        = express.Router();
const { check, validationResult }   = require('express-validator/check');
const auth                          = require('../../middleware/auth');
const Sheet                         = require('../../models/Sheet');

/*
*   @route       POST api/sheets
*   @desc        create sheet
*   @access      Private
*/
router.post('/', [auth,
    [
        check('patient.name', 'Patient Name is required').not().isEmpty(),
        check('patient.lastName', 'Patient LastName is required').not().isEmpty(),
        check('patient.age', 'Patient Age is required').not().isEmpty(),
        check('patient.weight', 'Patient Weight is required').not().isEmpty(),
        check('patient.medicalHistoryNumber', 'Patient Medical History Number is required').not().isEmpty(),
        check('patient.diagnosisSurgery', 'Patient Diagnosis\/Surgery is required').not().isEmpty(),
        check('room', 'Room is required').not().isEmpty()
    ]
], async (req, res) => {
    const err = validationResult(req);
    
    if(!err.isEmpty()) {
        return res.status(400).json({ errors: err.array() });
    }

    const {
        patient,
        room,
        lock,
        infusionPump
    } = req.body;

    const fields = {};

    fields.createdBy = req.user.id;
    fields.institution = 'Hospital La La'
    fields.patient = patient && patient;
    fields.room = room && room;
    fields.lock = lock && lock;
    fields.infusionPump = infusionPump && infusionPump;

    /* sheetFields.patient = {};
    sheetFields.patient.name = patient.name && patient.name;
    sheetFields.patient.lastName = patient.lastName && patient.lastName;
    sheetFields.patient.age = patient.age && patient.age;
    sheetFields.patient.weight = patient.weight && patient.weight;
    sheetFields.patient.medicalHistoryNumber = patient.medicalHistoryNumber && patient.medicalHistoryNumber;
    sheetFields.patient.diagnosisSurgery = patient.diagnosisSurgery && patient.diagnosisSurgery; */

    console.log(fields);
    try {

        // TODO: validate before saving
        const sheet = new Sheet(fields);

        await sheet.save();
        res.json(sheet);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

/*
*   @route       GET api/sheets
*   @desc        Get all sheets
*   @access      Private
*/
router.get('/', auth, async (req, res) => {
    try {
        const sheets = await Sheet.find()
            .populate({
                path: 'createdBy', 
                model: 'user', 
                select: 'name lastName -_id'
            });

        res.json(sheets);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

/*
*   @route       GET api/sheets/:id
*   @desc        Get sheet by Id
*   @access      Private
*/
router.get('/:id', auth, async (req, res) => {
    try {
        const sheet = await Sheet.findById(req.params.id);

        if(!sheet) {
            return res.status(400).json({ errors: [{ msg: 'Sheet doesn\'t exist'}] });
        }

        res.json(sheet);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

/*
*   @route       PUT api/sheets/:id/evaluation
*   @desc        create sheet evaluation
*   @access      Private
*/
router.put('/:id/evaluation', [auth, 
    [
        check('env', 'Env is Required').not().isEmpty(),
        check('shift', 'Shift is Required').not().isEmpty()
    ]
], async (req, res) => {
    const err = validationResult(req);
    
    if(!err.isEmpty()) {
        return res.status(400).json({ errors: err.array() });
    }

    const {
        env,
        shift,
        adverseEffects,
        rescue,
        notes
    } = req.body;

    const fields = {};

    fields.env = env && env;
    fields.shift = shift && shift;
    fields.adverseEffects = adverseEffects && adverseEffects;
    fields.evaluator = req.user.id;
    fields.rescue = rescue && rescue;
    fields.notes = notes && notes;

    try {

        const sheet = await Sheet.findById(req.params.id)
            /* .populate({
                path: 'evaluations', 
                populate: { 
                    path: 'evaluator', 
                    model: 'user', 
                    select: 'name lastName -_id'
                }
            }) */;

        if(!sheet) {
            return res.status(400).json({ errors: [{ msg: 'Sheet doesn\'t exists'}] });
        }

        sheet.evaluations.unshift(fields);
        await sheet.save();
        res.json(sheet);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

/*
*   @route       DELETE api/sheets/:id/evaluation/:ev_id
*   @desc        delete evaluation by id
*   @access      Private
*/
router.delete('/:id/evaluation/:ev_id', auth, async (req, res) => {
    try {
        const sheet = await Sheet.findById(req.params.id);

        if(!sheet) {
            return res.status(400).json({ errors: [{ msg: 'Sheet doesn\'t exists'}] });
        }

        const removeIndex = sheet.evaluations.map(item => item.id).indexOf(req.params.ev_id);

        sheet.evaluations.splice(removeIndex, 1);
        await sheet.save();
        res.json(sheet);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

/*
*   @route       DELETE api/sheets/:id
*   @desc        delete sheet id
*   @access      Private
*/
router.delete('/:id', auth, async (req, res) => {
    try {
        const sheet = await Sheet.findByIdAndRemove(req.params.id);

        if(!sheet) {
            return res.status(400).json({ errors: [{ msg: 'Sheet doesn\'t exists'}] });
        }

        res.json({ msg: 'Sheet Deleted' });
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;