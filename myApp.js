var express = require('express');
var app = express();

const path = `${__dirname}/views/index.html`
app.get('/',(req, res) =>{
    res.sendFile(path);
})
module.exports = app;
