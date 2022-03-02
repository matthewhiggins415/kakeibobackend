const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

// define server and client ports
// used for cors and local port declaration
const serverDevPort = 4741
const clientDevPort = 7165
const redesignDevPort = 3000

const app = express()

const port = process.env.PORT || serverDevPort 

app.listen(port, () => {
    console.log('listening on port ' + port)
})