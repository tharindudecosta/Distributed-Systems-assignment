const mongoose = require('mongoose');
const express = require('express')
const proxy = require('express-http-proxy')
const cors = require('cors')

// express app
const app = express()

const PORT = 4000

app.use(cors())
app.use(express.json())
// middleware
app.use((req, res, next) => {
  console.log(req.path +" "+ req.method)
  next()
})

app.use('/api/userSevice',proxy('http://localhost:4001'))
app.use('/api/courseService',proxy('http://localhost:4002'))
app.use('/api/courseContentService',proxy('http://localhost:4003'))
app.use('/api/enrollmentService',proxy('http://localhost:4004'))
app.use('/api/paymentService',proxy('http://localhost:4005'))


// routes
app.get('/', (req, res) => {
  res.json({mssg: 'Welcome to the app backend-api index'})
})


app.listen(PORT, () => {
  console.log('API gate way listening on port', PORT)
})