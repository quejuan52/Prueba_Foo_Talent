import { Component } from '@angular/core';
import { PeticionService } from '../../servicios/peticion.service';
import { MensajesService } from '../../servicios/mensajes.service';
import { MenulateralComponent } from "../menulateral/menulateral.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
declare let $:any
@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [MenulateralComponent,CommonModule, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  constructor(private peticion: PeticionService, private msg:MensajesService){}

  ngOnInit(): void {
    this.cargarDatos()  
  }
  datos: any[] = []

  nombre : string = ""
  email : string = ""
  edad : Number = 0
  telefono : string = ""
  password : string = ""
  idseleccionado:string=""

  abrirModal(){
    $('#exampleModal').modal('show')
    this.nombre=""
    this.email=""
    this.edad=0
    this.telefono=""
    this.password=""
    this.idseleccionado=""
    
  }
  
  Guardar(){

    /*$$$$$$$$$$$$$$$$$$ ESTRUCTURA DE LA PETICIÓN $$$$$$$$$$$$$$$$$$$$$$$$$$$$*/
      let data = {
        host: this.peticion.UrlHost,/* dominio que lo guardamos de forma publica*/
        path: "/usuarios/guardar",
        payload: {
          nombre:this.nombre,
          email:this.email,
          edad:this.edad,
          telefono:this.telefono,
          password: this.password
  
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
      path:"/usuarios/listar",
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
      path: "/usuarios/listarid",
      payload: {
        _id:id,
      }
    }
    this.peticion.Get(data.host + data.path + data.payload).then((res:any)=>{/*COMO SE HACE LA PETICIÓN*/
      console.log(res)
      this.nombre = res.informacion[0].nombre
      this.email = res.informacion[0].email
      this.edad = res.informacion[0].edad
      this.telefono = res.informacion[0].telefono

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
      path: `/usuarios/eliminar/${this.idseleccionado}`,
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
      path: `/usuarios/actualizar/${this.idseleccionado}`,
      payload: {
        nombre:this.nombre,
        edad:this.edad,
        telefono:this.telefono,
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
}
