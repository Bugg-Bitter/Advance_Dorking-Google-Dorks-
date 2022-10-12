const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')

const port = 5000
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(port, () => console.log(`Listen on the port ${port}`))