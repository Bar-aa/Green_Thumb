const express = require("express");
const router = express.Router();
const resource = require('../controllers/resource');

router.get('/show', resource.showresorce); // Move '/show' route above '/:owner_id'
router.get('/:owner_id', resource.getresource);
router.post('/add', resource.addResource);
router.delete('/delete/:id', resource.deleteresource);
module.exports = router;


