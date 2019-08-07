const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

let Shcema = mongoose.Schema;
let roles = {
    values:['USER_ROLE','ADMIN_ROLE'],
    message: '{VALUE} no es un rol valido'
};

//definicion del schema.
let usuarioSchema = new Shcema({
    nombre:{
        type:String,
        required: [true, 'El nombre es requerido']
    },
    email:{
        type:String,
        unique:true,
        required: [true, 'El correo es requerido']
    },
    password:{
        type:String,
        required: [true, 'La clave es requerido']
    },
    img:{
        type:String
    },
    role:{
        type:String,
        default:'USER_ROLE',
        required: [true, 'El role es requerido'],
        enum: roles
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }
});

usuarioSchema.methods.toJSON = function (){
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

usuarioSchema.plugin(uniqueValidator, {message:'{PATH} debe de ser unico'});

module.exports = mongoose.model('Usuario', usuarioSchema);
