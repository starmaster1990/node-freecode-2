var express = require('express');
var app = express();

const path = `${__dirname}/views/index.html`

app.use('/public',express.static(`${__dirname}/public`))

app.get('/',(req, res) =>{
    res.sendFile(path)
})

app.get('/json', (req, res) => {
    const miObjeto = {"message": "Hello json"}
    res.setHeader('Content-Type', 'application/json');
    res.json(miObjeto)
})
module.exports = app;
