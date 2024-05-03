require('dotenv').config()

const mongoose = require('mongoose');
const express = require('express')
const cors = require('cors')

// express app
const app = express()

// middleware
app.use((req, res, next) => {
  console.log(req.path +" "+ req.method)
  next()
})
app.use(cors())

// routes
app.get('/', (req, res) => {
  res.json({mssg: 'Welcome to the Payment service'})
})

// listen for requests
mongoose.connect("mongodb+srv://user1:pass@cluster0.obfkb3h.mongodb.net/MS_Project?retryWrites=true&w=majority")
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(4003, () => {
      console.log('Backend 1 listening on port',4003)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 