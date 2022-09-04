const express = require('express')
let router = express.Router()
router.post('/getInfo', require('./getInfo'))
router.post('/forget', require('./forget'))
router.post('/reset', require('./reset'))
module.exports = router