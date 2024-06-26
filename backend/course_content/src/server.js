const mongoose = require('mongoose');
const express = require('express')
const cors = require('cors')

const MONGO_URI = "mongodb+srv://user1:pass@cluster0.obfkb3h.mongodb.net/MS_Project?retryWrites=true&w=majority"
const PORT = 4003

const courseContentRoutes = require('./routes/courseContents')

// express app
const app = express()

// middleware
app.use((req, res, next) => {
  console.log(req.path +" "+ req.method)
  next()
})
app.use(express.json());
app.use(cors())

// routes
app.post('/', (req, res) => {
  const { name } = req.body;
  res.json({mssg: 'Welcome to the course service '+ name })
})

app.use('/courseContents', courseContentRoutes)

// listen for requests
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to mongo database')
    // listen to port
    app.listen(PORT, () => {
      console.log('Course content service listening on port',PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 