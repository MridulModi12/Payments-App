const express = require('express');
const cors = require('cors')
const apiRouter = require('./routes/index')
require('dotenv').config()


const app = express()
app.use(express.json())
app.use(cors({
  "origin": process.env.frontend_url
}))

app.use('/api/v1', apiRouter)

app.listen(3000)