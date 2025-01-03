const express = require('express');
const { User } = require('./db');
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())


const apiRouter = require('./routes/index')
app.use('/api/v1', apiRouter)

app.listen(3000)