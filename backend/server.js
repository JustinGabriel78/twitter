require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')
const cors = require('cors')
// express app
const app = express()

// middleware
app.use(express.json())
app.use(cors());   // enable CORS for all routes
app.use('/uploads',express.static('uploads'))

//routes

app.use('/api/user',userRoutes)
app.use('/api/post',postRoutes)
//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('listening on port', process.env.PORT)
        })
    })
    .catch((error )=> {
        console.log(error)
    })