const mongoose = require("mongoose")
const modelo = require("./nosql/user.js")

let loginModel = {}

loginModel.Login = function(post, callback){
    modelo.find({email:post.email, password:post.password, estado:"1"},{}).then((respuesta) =>{
    if(respuesta.length == 1){
        return callback({state:true, mensaje:"bienvenido: " + respuesta[0].nombre})
    }
    else{
        return callback({state:false, mensaje:"credenciales invalidas, verifique que su cuenta este activa "})
    }
    }).catch((error) =>{
        return callback({state:false, error:error})
    })
}

loginModel.activar = function(post, callback){

    modelo.findOneAndUpdate({ email:post.email,azar:post.azar},{estado:"1"}) // el segundo dato es el parametro que le voy actualizar
    .then(respuesta => {

        if(respuesta == undefined){
            return callback({state:false, mensaje:"su codigo no es valido"})
        }
        else{

        console.log('----->');
        console.log(respuesta);
        return callback({state:true, mensaje:"su cuenta fue activada"})
    }

    })
    .catch(error => {
        return callback({state: false, error: error})
    })
}

module.exports.loginModel = loginModel