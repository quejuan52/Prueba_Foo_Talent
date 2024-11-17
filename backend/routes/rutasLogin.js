const express = require('express');
const enrutadorLogin = express.Router();  

const loginController = require("../controladores/loginController.js").loginController



//$$$$$$$$$$$$$$$$$$$$$$$ configuracion para login $$$$$$$$$$$$$$$$$$$$$$$
enrutadorLogin.post("/login", function(request, response){
    loginController.Login(request,response)
})

enrutadorLogin.get("/activar/:email/:azar", function(request, response){
    loginController.activar(request,response)
})

module.exports = enrutadorLogin;