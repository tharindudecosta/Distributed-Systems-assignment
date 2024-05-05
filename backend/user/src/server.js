const mongoose = require('mongoose');
const express = require('express')
const cors = require('cors')

const MONGO_URI = "mongodb+srv://user1:pass@cluster0.obfkb3h.mongodb.net/MS_Project?retryWrites=true&w=majority"
const PORT = 4001

const userRoutes = require("./routes/userRoutes")

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
app.get('/', (req, res) => {
  res.json({mssg: 'Welcome to the User service'})
})

app.use("/users", userRoutes);

// listen for requests
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to mongo database')
    // listen to port
    app.listen(PORT, () => {
      console.log('User service listening on port',PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 