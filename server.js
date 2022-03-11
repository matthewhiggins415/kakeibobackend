const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require("dotenv").config()


// require route files
const userRoutes = require('./app/routes/user_routes.js')
const plaidRoutes = require('./app/routes/plaid_routes')
const expenseRoutes = require('./app/routes/expense_routes')

// require middleware
const errorHandler = require('./lib/error_handler')
const requestLogger = require('./lib/request_logger')

// require configured passport authentication middleware
const auth = require('./lib/auth')

// require database configuration logic
// `db` will be the actual Mongo URI as a string
const db = require('./config/db')

// define server and client ports
// used for cors and local port declaration
const serverDevPort = 4741
const clientDevPort = 7165

// establish database connection
// use new version of URL parser
// use createIndex instead of deprecated ensureIndex
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const app = express()

//cors 
app.use(cors({ origin: process.env.CLIENT_ORIGIN || `http://localhost:${clientDevPort}` }))


// register passport authentication middleware
app.use(auth)

const port = process.env.PORT || serverDevPort 

  
// add `express.json` middleware which will parse JSON requests into
// JS objects before they reach the route files.
// The method `.use` sets up middleware for the Express application
app.use(express.json())
// this parses requests sent by `$.ajax`, which use a different content type
app.use(express.urlencoded({ extended: true }))

// register route files
app.use(userRoutes)
app.use(plaidRoutes)
app.use(expenseRoutes)

// register error handling middleware
// note that this comes after the route middlewares, because it needs to be
// passed any error messages from them
app.use(errorHandler)

app.listen(port, () => {
    console.log('listening on port ' + port)
})

//needed for testing
module.exports = app