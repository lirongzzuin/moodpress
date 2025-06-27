const express = require('express')
const router = express.Router()
const { analyzeEmotion } = require('../controllers/analyzeController')

router.post('/', analyzeEmotion)

module.exports = router
