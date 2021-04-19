var express         = require('express');
var app             = express();
var env             = require("dotenv").config();
const bodyParser    = require('body-parser')


app.use('/public',express.static(`${__dirname}/public`))

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`)
    next()
})


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


const path = `${__dirname}/views/index.html`
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

app.get('/:word/echo',(req,res) => {
    const echo = req.params.word
    res.json({echo})
})

app.get('/name',(req, res) => {
    const { first, last } = req.query
    res.json({name: `${first} ${last}`})
})

app.post('/name', (req, res) => {
    const { first, last } = req.body
    res.json({name: `${first} ${last}`})
})

module.exports = app;
