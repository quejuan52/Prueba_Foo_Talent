const express = require("express")
global.app = express() 
global.config = require("./config.js").config
let bodyParser = require('body-parser')
const init_DB =require("./db")
const cors = require ('cors')
const rutasUsuarios = require("./routes/rutasUsuarios.js")
const rutasProductos = require("./routes/rutasProductos.js")
const rutasLogin = require("./routes/rutasLogin.js")



global.sha256 = require('sha256') // libreria de encriptacion 
global.path = require('path')
global.appRoot = path.resolve(__dirname)

//Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// configuración de cors
app.use(cors({
    origin:function(origin, callback){
        console.log(origin)
        if(!origin) return callback(null, true)
            console.log(origin)
        if(config.origins.indexOf(origin) === -1) {
            console.log('error')
            return callback('error de cors', false)
        }
        return callback(null, true)
    }
}));


// Rutas
app.use('/', rutasUsuarios); 
app.use('/', rutasProductos); 
app.use('/', rutasLogin); 



// Inicializar base de datos
init_DB()

//Iniciar el servidor 
app.listen(config.puerto, function(){
    console.log("servidor funcionando por el puerto"+ config.puerto)
})
