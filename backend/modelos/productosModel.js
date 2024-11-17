const mongoose = require("mongoose")
const modelo = require("./nosql/productos")

let productosModel = {}


productosModel.Guardar = function(post, callback) {
    const instancia = new modelo
    instancia.codigo = post.codigo
    instancia.nombre = post.nombre
    instancia.imagen = post.imagen
    instancia.categoria = post.categoria
    instancia.precio = post.precio
    instancia.descripcion = post.descripcion
    
    
    instancia.save().then((respuesta)=>{
        console.log(respuesta)
        return callback({state: true, mensaje: "elemento guardado en la db" });
    }).catch((error)=>{
        return callback({state: false, mensaje: "error al almacenar",error:error});
    })      
}

productosModel.Listar = function(post, callback) {
    modelo.find({},{__v:0})
        .then(respuesta => {
            return callback({ state: true, informacion: respuesta});
        })
        .catch(error => {
            return callback({ state: false, mensaje: error.message });
        });
}

productosModel.Listarid = function(post, callback) {
    modelo.find({_id:post._id},{__v:0})
        .then(respuesta => {
            return callback({ state: true, informacion: respuesta});
        })
        .catch(error => {
            return callback({ state: false, mensaje: error.message });
        });
}

productosModel.verificarCodigo =  function(post, callback) {
    modelo.find({codigo: post.codigo}, {})
        .then(res => {
            console.log(res.length)
            if (res.length > 0) {
                return callback({ existe: true})// el usuario lo encontro en la db 
                
            } else {
                return callback({ existe: false })
            }
        })
        .catch(error => {
            return callback({state: false, error:error });
        })
}

productosModel.Actualizar = function(post, callback){

    modelo.findOneAndUpdate( { _id: post._id }, 
        { 
            $set: {
                codigo: post.codigo, 
                nombre: post.nombre, 
                imagen: post.imagen,
                categoria: post.categoria,
                precio: post.precio,
                descripcion: post.descripcion
            }
        },
        { new: true, runValidators: true  } // Para que la respuesta devuelta sea el documento actualizado
    ) 
    .then(respuesta => {
        return callback({state:true, informacion:respuesta})
    })
    .catch(error => {
        return callback({state: false, error: error})
    })
}

productosModel.Eliminar = function(filtro,callback){
    
    modelo.findOneAndDelete({_id: filtro._id }) 
    .then(respuesta => {
        return callback({state:true})
    })
    .catch(error => {
        return callback({state: false, error: error})
    })
}

module.exports.productosModel = productosModel
