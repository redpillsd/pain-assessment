const express = require('express');
const router = express.Router();

/*  
*   @route       GET api/evaluations
*   @desc        get evaluations
*   @access      Public 
*/
router.get('/', (req, res) => {
    res.send('evaluations')
});

module.exports = router;