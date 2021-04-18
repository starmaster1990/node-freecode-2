var express = require('express');
var app     = express();
var env     = require("dotenv").config();

const path = `${__dirname}/views/index.html`

app.use('/public',express.static(`${__dirname}/public`))

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`)
    next()
})

app.get('/',(req, res) =>{
    res.sendFile(path)
})

app.get('/json', (req, res) => {
    let message     = 'Hello json'
    message         = (process.env.MESSAGE_STYLE == 'uppercase') ? message.toUpperCase() : message
    const miObjeto  = { message }
    res.setHeader('Content-Type', 'application/json');
    res.json(miObjeto)
})

app.get('/now', (req, res, next) => {
    req.time = new Date().toString()
    next()
}, (req, res) => {
    res.setHeader('Content-Type','application/json')
    res.json({time: req.time})
})

module.exports = app;
