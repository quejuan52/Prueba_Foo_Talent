let productosModel = require("../modelos/productosModel.js").productosModel

let productosController = {}

productosController.Guardar = function(request,response){
    let post = {
        codigo:request.body.codigo,
        nombre: request.body.nombre,
        imagen: request.body.imagen,
        categoria: request.body.categoria,
        precio: request.body.precio,
        descripcion: request.body.descripcion            
    }

    if(post.codigo == undefined || post.codigo == null || post.codigo == "" ){
        response.json({state:false, mensaje: "el campo codigo es obligatorio"})
        return false 
    }
    if(post.nombre == undefined || post.nombre == null || post.nombre == "" ){
        response.json({state:false, mensaje: "el campo nombre es obligatorio"})
        return false // para parar la revision del codigo asia abajo 
    }

    if(post.imagen == undefined || post.imagen == null || post.imagen == "" ){
        response.json({state:false, mensaje: "el campo imagen es obligatorio"})
        return false 
    }
    if(post.categoria == undefined || post.categoria == null || post.categoria == "" ){
        response.json({state:false, mensaje: "el campo categoria es obligatorio"})
        return false 
    }
    if(post.precio == undefined || post.precio == null || post.precio == "" ){
        response.json({state:false, mensaje: "el campo precio es obligatorio"})
        return false 
    }
    if(post.descripcion == undefined || post.descripcion == null || post.descripcion == "" ){
        response.json({state:false, mensaje: "el campo descripcion es obligatorio"})
        return false 
    }

    productosModel.verificarCodigo(post,function(verificar){
        if(verificar.existe == false){
            productosModel.Guardar(post,function(respuesta){
                response.json(respuesta)
            })
        }else {
            response.json({state:false,mensaje:"El codigo de la categoria ya existe en la DB"})
            return false
        }
    })

}

productosController.Listar = function(request,response){
    productosModel.Listar(null,function(respuesta){
        response.json(respuesta)
    })
    
}

productosController.Listarid = function(request,response){
    const {id} = request.params
    productosModel.Listarid({_id:id},function(respuesta){
        response.json(respuesta)
    })
    
}

productosController.Actualizar = function(request,response){

    const { id } = request.params; 
    let post = {
        _id:id,
        codigo: request.body.codigo,
        nombre:request.body.nombre,
        imagen:request.body.imagen,
        categoria:request.body.categoria,
        precio:request.body.precio,
        descripcion:request.body.descripcion
    }
    if(post.codigo == undefined || post.codigo == null){
        response.json({state:false, mensaje: "el campo codigo es obligatorio"})
        return false 
        }  
    if(post.nombre == undefined || post.nombre == null){
        response.json({state:false, mensaje: "el campo nombre es obligatorio"})
        return false 
        }
    if(post.imagen == undefined || post.imagen == null){
    response.json({state:false, mensaje: "el campo imagen es obligatorio"})
    return false 
    }
    if(post.categoria == undefined || post.categoria == null){
        response.json({state:false, mensaje: "el campo categoria es obligatorio"})
        return false 
        }
    if(post.precio == undefined || post.precio == null){
        response.json({state:false, mensaje: "el campo precio es obligatorio"})
        return false 
        }
    if(post.descripcion == undefined || post.descripcion == null){
        response.json({state:false, mensaje: "el campo descripcion es obligatorio"})
        return false 
        }
        productosModel.Actualizar(post, function(actualiza){
        if(actualiza.state === true){
            response.json({state:true, mensaje:"producto actualizado correctamente"})
        }else{
            response.json({state:false, mensaje:"error al actualizar"})
            }
        })
}

productosController.Eliminar = function(request,response){
    const {id} = request.params
    
    productosModel.Eliminar({_id:id}, function(actualiza){

    if(actualiza.state == true){
        response.json({state:true, mensaje:"elemento eliminado correctamente"})

    }else{
        response.json({state:false, mensaje:"error al eliminar"})
    }
    }) 
}

module.exports.productosController = productosController
