const express = require('express')
const router = express.Router()
const mhome = require('../controllers/mhome')
router.post('/',mhome.homeinfo)
module.exports = router