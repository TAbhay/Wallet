const express = require('express')
const router = express.Router()
const {
    createRandomUserAcc
} = require('../controllers/seedController')

router.post('/seeduser', createRandomUserAcc)


module.exports = router
