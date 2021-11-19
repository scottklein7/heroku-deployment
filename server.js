// Dependencies 
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
require('dotenv').config()


// init app
const app = express()

// Config port 
const PORT = process.env.PORT || 3000

// Data base
const db = mongoose.connection
const MONGODB_URI = process.env.MONGODB_URI

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// db listeners
db.on('error', (err) => console.log(err.message + "is mongo not running"))
db.on('connected', () => console.log("mongo connected:", MONGODB_URI))
db.on('disconnected', () => console.log("mongo disconnected"))

// middleware
app.use(express.static('public')) // for any public assets 
app.use(express.urlencoded({ urlencoded: false })) // no nested objects in query strings
app.use(express.json()) // returns middleware that parses json 
app.use(methodOverride('_method')) // method override for POST PUT and DEL in our form

// routes 
app.get('/', (req,res) => {
    res.send("Hello world")
})

// listen on our port
app.listen(PORT, () => {
    console.log(`express listening on port: ${PORT}`)
})