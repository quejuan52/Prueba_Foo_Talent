const express = require('express');
const enrutadorusuarios = express.Router();  
const usuariosController = require("../controladores/usuariosController.js").usuariosController




//$$$$$$$$$$$$$$$$$$$$$$$$$Configuración de rutas $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

enrutadorusuarios.post("/usuarios/guardar", function(req, res){
    usuariosController.Guardar(req,res)
})

enrutadorusuarios.get("/usuarios/listar", function(req, res){
    usuariosController.Listar(req,res)
})

enrutadorusuarios.get("/usuarios/listarid/:id", function(req, res){
    usuariosController.Listarid(req,res)
})

enrutadorusuarios.put("/usuarios/actualizar/:id", function(req, res){
    usuariosController.Actualizar(req,res)
})

enrutadorusuarios.delete("/usuarios/eliminar/:id", function(req, res){
    usuariosController.Eliminar(req,res)
})

enrutadorusuarios.put("/usuarios/actualpass", function(req, res){
    usuariosController.ActualPass(req,res)
})



module.exports = enrutadorusuarios;
