import { Component } from '@angular/core';
import { MenulateralComponent } from '../menulateral/menulateral.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PeticionService } from '../../servicios/peticion.service';
import { MensajesService } from '../../servicios/mensajes.service';
declare let $:any
@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [MenulateralComponent, FormsModule, CommonModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  constructor(private peticion: PeticionService, private msg:MensajesService){}

  ngOnInit(): void {
    this.cargarDatos()  
    this.cargarcategorias()
  }
  datos: any[] = []
  datosCategorias: any[] = []

  codigo : string = ""
  nombre : string = ""
  categoria:string = ""
  imagen:string = ""
  precio:string = ""
  descripcion:string = ""
  idseleccionado:string=""

  abrirModal(){
    $('#exampleModal').modal('show')
    
    this.codigo=""
    this.nombre=""
    this.imagen =""
    this.categoria =""
    this.precio=""
    this.descripcion =""
    this.idseleccionado=""
    
  }
  
  Guardar(){

    /*$$$$$$$$$$$$$$$$$$ ESTRUCTURA DE LA PETICIÓN $$$$$$$$$$$$$$$$$$$$$$$$$$$$*/
      let data = {
        host: this.peticion.UrlHost,/* dominio que lo guardamos de forma publica*/
        path: "/productos/guardar",
        payload: {
          codigo:this.codigo,
          nombre:this.nombre,
          imagen:this.imagen,
          categoria:this.categoria,
          precio:this.precio,
          descripcion:this.descripcion
        }
      }
      this.peticion.Post(data.host + data.path, data.payload).then((res:any)=>{/*COMO SE HACE LA PETICIÓN*/
        console.log(res)
        if(res.state == false){
          this.msg.Load("danger", res.mensaje)
        }
        else{
          this.msg.Load("dark", res.mensaje)
          this.cargarDatos()
          $('#exampleModal').modal('hide')
        }
      })
      
    }

  cargarDatos(){
    let data = {
      host: this.peticion.UrlHost,/* dominio que lo guardamos de forma publica*/
      path:"/productos/listar",
      payload:{}  
  }
  this.peticion.Get(data.host + data.path).then((res:any)=>{
    this.datos = res.informacion
    console.log("Datos cargados:", this.datos);
  }).catch(error => {
    console.error("Error al cargar datos:", error);
  });
}
  
  
  editarRegistro(id:string){
    this.idseleccionado = id
    console.log(this.idseleccionado)
    $('#exampleModal').modal('show')
    let data = {
      host: this.peticion.UrlHost,/* dominio que lo guardamos de forma publica*/
      path: `/productos/actualizar/${this.idseleccionado}`,
      payload: {
        _id:id,
      }
    }
    this.peticion.Put(data.host + data.path, data.payload).then((res:any)=>{/*COMO SE HACE LA PETICIÓN*/
      console.log(res)
      this.codigo = res.informacion[0].codigo
      this.nombre = res.informacion[0].nombre
      this.categoria = res.informacion[0].categoria
      this.imagen = res.informacion[0].imagen
      this.precio = res.informacion[0].precio
      this.descripcion = res.informacion[0].descripcion

      if(res.state == false){
        this.msg.Load("danger", res.mensaje)
      }
      else{
        this.msg.Load("dark", res.mensaje)
        this.cargarDatos()
        $('#exampleModal').modal('hide')
      }
    })


  }

  Eliminar(){
    let data = {
      host: this.peticion.UrlHost,/* dominio que lo guardamos de forma publica*/
      path: `/productos/eliminar/${this.idseleccionado}`,
      payload: {
        _id:this.idseleccionado,
      }
    }
    this.peticion.Delete(data.host + data.path, data.payload).then((res:any)=>{/*COMO SE HACE LA PETICIÓN*/
      console.log(res)
      if(res.state == false){
        this.msg.Load("danger", res.mensaje)
      }
      else{
        this.msg.Load("dark", res.mensaje)
        this.cargarDatos()
        $('#exampleModal').modal('hide')
      }
    })
    
  }

  Actualizar(){
    let data = {
      host: this.peticion.UrlHost,/* dominio que lo guardamos de forma publica*/
      path: `/productos/actualizar/${this.idseleccionado}`,
      payload: {
        codigo:this.codigo,
        nombre:this.nombre,
        imagen:this.imagen,
        categoria:this.categoria,
        precio:this.precio,
        descripcion:this.descripcion,
        _id:this.idseleccionado
      }
    }
    this.peticion.Put(data.host + data.path, data.payload).then((res:any)=>{/*COMO SE HACE LA PETICIÓN*/
      console.log(res)
      if(res.state == false){
        this.msg.Load("danger", res.mensaje)
      }
      else{
        this.msg.Load("dark", res.mensaje)
        this.cargarDatos()
        $('#exampleModal').modal('hide')
      }
    })
}
  cargarcategorias(){
    let data = {
      host: this.peticion.UrlHost,/* dominio que lo guardamos de forma publica*/
      path:"/categorias/listar",
      payload:{}  
  }
  this.peticion.Get(data.host + data.path).then((res:any)=>{
    this.datosCategorias = res.informacion
    console.log("Datos cargados:", this.datos);
  }).catch(error => {
    console.error("Error al cargar datos:", error);
  });
  }

}
