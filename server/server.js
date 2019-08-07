const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const app = express()
require('./config/config');

//middle wear
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('./routes/usuario'));


app.get('/', function (req, res) {
  res.json('Hello World')
})
 
mongoose.connect(process.env.URLDB, {useNewUrlParser: true, useCreateIndex: true}, (err, res) => {
    if(err)throw err;
    else console.log('base online')
});
app.listen(process.env.PORT, ()=> console.log("escuchando 3000"))