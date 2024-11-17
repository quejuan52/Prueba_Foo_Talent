let loginModel = require("../modelos/loginModel.js").loginModel

let loginController = {}

loginController.Login = function(request,response){
    let post = {
        email:request.body.email,
        password:request.body.password
    }
    if(post.email == undefined || post.email == null || post.email == "" ){
        response.json({state:false, mensaje: "el campo email es obligatorio"})
        return false 
    }
    if(post.password == undefined || post.password == null || post.password == "" ){
        response.json({state:false, mensaje: "el campo password es obligatorio"})
        return false 
    }
    
    post.password = sha256(post.password + config.encriptado)

    loginModel.Login(post,function(respuesta){
        if(respuesta.state == true){
            response.json(respuesta)
        }else{
            response.json(respuesta)
        }
    })


}

loginController.activar = function(request,response){
    let post = {
        email:request.params.email,
        azar:request.params.azar
    }
    loginModel.activar(post,function(respuesta){
        if(respuesta.state == true){
            response.json(respuesta)
        }else{
            response.json(respuesta)
        }
    })
}

module.exports.loginController = loginController