const express = require('express');
const enrutadorProductos = express.Router();  

const productosController = require("../controladores/productosController.js").productosController


// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ Configuracion de Rutas $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$



enrutadorProductos.post("/productos/guardar", function(req, res){
    productosController.Guardar(req,res)
})

enrutadorProductos.get("/productos/listar", function(req, res){
    productosController.Listar(req,res)
})

enrutadorProductos.post("/productos/filtro", function(req, res){
    productosController.Filtro(req,res)
})

enrutadorProductos.get("/productos/listarid/:id", function(req, res){
    productosController.Listarid(req,res)
})

enrutadorProductos.put("/productos/actualizar/:id", function(req, res){
    productosController.Actualizar(req,res)
})

enrutadorProductos.delete("/productos/eliminar/:id", function(req, res){
    productosController.Eliminar(req,res)
})

module.exports = enrutadorProductos;