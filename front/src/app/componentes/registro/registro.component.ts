import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PeticionService } from '../../servicios/peticion.service';
import { MensajesService } from '../../servicios/mensajes.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,FormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  constructor(private peticion:PeticionService, private msg:MensajesService){}
  nombre : string = ""
  email : string = ""
  edad : Number = 0
  telefono : string = ""
  password : string = ""

  
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
    console.log("el host",data.host)
    console.log("el path",data.path)
    console.log("el payload",data.payload)
    this.peticion.Post(data.host + data.path, data.payload).then((res:any)=>{/*COMO SE HACE LA PETICIÓN*/
      console.log(res)
      if(res.state == false){
        this.msg.Load("danger", res.mensaje)
      }
      else{
        this.msg.Load("light", res.mensaje)
        this.nombre  = ""
        this.email  = ""
        this.edad  = 0
        this.telefono= ""
        this.password = ""
      }
    })
  }
}
