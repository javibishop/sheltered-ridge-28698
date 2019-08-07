const express = require('express')
const app = express()
const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt');
const _ = require('underscore')

app.get('/usuario', function (req, res) {
let desde = Number(req.query.desde || 0);
let hasta = Number(req.query.hasta || 5);

//Usuario.find({google:true}) filtro por google = true
let filtro = {estado:true};
 Usuario.find(filtro, 'nombre email role google estado')
 .skip(desde) /* salta los 5 registros por get */
 .limit(hasta) /* 5 registros por get */
 .exec((err, usuarios) => {
    
    if(err){
        return res.status(400).json({ok: false, err});
    }else{
        //usuarioDB.password = null;
        Usuario.count(filtro, (err, cantidad) =>{
            return res.json(
                {
                    ok: true, 
                    usuarios,
                    cantidad
                });
        })
        
    }
 });     
})

 app.post('/usuario', function (req, res) {
    //req.body es lo que parseo el body parser.
    let body = req.body;
    //console.log(body);

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync( body.password, 10),
        role: body.role
    });
    // console.log(JSON.stringify(usuario));

    
    usuario.save((err, usuarioDB) => {
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            //usuarioDB.password = null;
            return res.json({ok: true, usuario: usuarioDB});
        }
    })
})

app.put('/usuario/:id', function (req, res) {
    //el :id aparece en params, si es otro nombre, aparece otro nombre.
    let id = req.params.id;
    //una forma de quitar el pass y el role para que no se modifiquen es:
    // delete body.password;
    // delete body.google;
    //o con underscore

    let body = _.pick(req.body, ['nombre, email, img, role, estado']);

    //new, es para que retorne el usuario actualizado. runV es para que corra las validaciones definidas antes de grabar. Sino no las corre
    let optionsMongoose = {
        new: true, 
        runValidators:true
    }
    Usuario.findByIdAndUpdate(id, body, optionsMongoose, (err, usuarioDB) =>{
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            //usuarioDB.password = null;
            return res.json({ok: true, usuario: usuarioDB});
        }
    })
    
})

app.delete('/usuario/fisico/:id', function (req, res) {
    let id = req.params.id;
    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) =>{
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            if(usuarioBorrado){
                return res.json({ok: true, mensaje: 'Usuario eliminado!.', usuarioBorrado});
            }else{
                return res.json({ok: true, mensaje: 'Usuario no encontrado'});
            }
            
        }
    })
})

app.delete('/usuario/:id', function (req, res) {
    let id = req.params.id;
    let optionsMongoose = {
        new: true, 
        runValidators:true
    }
    Usuario.findByIdAndUpdate(id, {estado:false}, optionsMongoose, (err, usuarioDB) =>{
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            //usuarioDB.password = null;
            return res.json({ok: true, usuario: usuarioDB});
        }
    })
})

module.exports = app;