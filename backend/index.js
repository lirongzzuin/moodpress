const fs = require('fs');

const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

// 모든 origin 허용 (개발 환경)
app.use(cors())

// preflight OPTIONS 요청에 대한 응답 처리
app.options('*', cors())

app.use(express.json())

const analyzeRouter = require('./routes/analyze')
app.use('/api/analyze', analyzeRouter)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
