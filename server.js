const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require("dotenv").config()

// require route files
const exampleRoutes = require('./app/routes/example_routes')
const userRoutes = require('./app/routes/user_routes.js')


// require middleware
const errorHandler = require('./lib/error_handler')
const requestLogger = require('./lib/request_logger')

// require database configuration logic
// `db` will be the actual Mongo URI as a string
const connectDB = require('./app/config/db')

// require configured passport authentication middleware
const auth = require('./lib/auth')

// define server and client ports
// used for cors and local port declaration
const serverDevPort = 4741
const clientDevPort = 7165
const redesignDevPort = 3000

const app = express()

//cors 
app.use(cors({ origin: `http://localhost:${redesignDevPort}` }))

const port = process.env.PORT || serverDevPort 

// establish database connection
// use new version of URL parser
// use createIndex instead of deprecated ensureIndex
connectDB()

// add `express.json` middleware which will parse JSON requests into
// JS objects before they reach the route files.
// The method `.use` sets up middleware for the Express application
app.use(express.json())
// this parses requests sent by `$.ajax`, which use a different content type
app.use(express.urlencoded({ extended: true }))

// register route files
app.use(exampleRoutes)
app.use(userRoutes)

// register error handling middleware
// note that this comes after the route middlewares, because it needs to be
// passed any error messages from them
app.use(errorHandler)

app.listen(port, () => {
    console.log('listening on port ' + port)
})

//needed for testing
module.exports = app