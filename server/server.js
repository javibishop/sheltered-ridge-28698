const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('./config/config');

//middle wear
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/usuario', function (req, res) {
    res.json('get usuario')
})

app.post('/usuario', function (req, res) {
    //req.body es lo que parseo el body parser.
    let body = req.body;

    if(body.nombre === undefined){
        res.status(400).json({ok: false, mensaje: 'el nombre es necesario'});
    }else{
        res.json({persona: body})
    }
    
})

app.put('/usuario/:id', function (req, res) {
    //el :id aparece en params, si es otro nombre, aparece otro nombre.
    let id = req.params.id;
    res.json('put usuario' + id)
})

app.delete('/usuario', function (req, res) {
    res.json('delete usuario')
})

app.get('/', function (req, res) {
  res.json('Hello World')
})
 
app.listen(process.env.PORT, ()=> console.log("escuchando 3000"))