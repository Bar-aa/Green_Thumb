
const express = require('express');
const router = express.Router();
const { getPestInfo } = require('../Services/PestService');

router.get('/:PestName', getPestInfo );


module.exports = router;
