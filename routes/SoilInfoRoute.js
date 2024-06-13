
const express = require('express');
const router = express.Router();
const { getLayers, getSoilProperty } = require('../Services/SoilInfoService');

router.get('/layers', getLayers);
router.get('/soilproperty', getSoilProperty);


module.exports = router;
