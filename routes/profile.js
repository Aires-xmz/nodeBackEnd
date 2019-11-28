const express = require('express')
const router = express.Router()
let uploadMiddleware = require('../middleware/upload')
let profile = require('../controllers/profile')

router.route('/')
    .get(profile.personalData)
    .patch(uploadMiddleware,profile.updata)//
module.exports = router