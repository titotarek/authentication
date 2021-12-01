const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
const router = require('./config/router')
const mongoose = require('./config/mongoose')

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())


app.use(router)
app.listen(5900, console.log('server running on port 5900'))