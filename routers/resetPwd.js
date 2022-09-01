const express = require('express')
let router = express.Router()
router.post('/getInfo', require('./getInfo'))
router.post('/forget', require('./forget'))
module.exports = router