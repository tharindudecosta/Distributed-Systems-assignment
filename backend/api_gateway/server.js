const mongoose = require('mongoose');
const express = require('express')
const proxy = require('express-http-proxy')
const cors = require('cors')

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function(req,file,cb){
    return cb(null,"./upload")
  },
  filename: function(req,file,cb){
    return cb(null, `${Date.now()}_${file.originalname}`)
  }
})
const uploadfile = multer({ storage });

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


// routes
app.get('/', (req, res) => {
  res.json({mssg: 'Welcome to the app backend-api index'})
})


app.listen(PORT, () => {
  console.log('API gate way listening on port', PORT)
})