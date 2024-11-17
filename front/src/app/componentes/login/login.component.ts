import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { PeticionService } from '../../servicios/peticion.service';
import { MensajesService } from '../../servicios/mensajes.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private peticion:PeticionService, private msg:MensajesService, private router: Router){}

  email : string = ""
  password : string = ""

  
  Login(){

  /*$$$$$$$$$$$$$$$$$$ ESTRUCTURA DE LA PETICIÓN $$$$$$$$$$$$$$$$$$$$$$$$$$$$*/
    let data = {
      host: this.peticion.UrlHost,/* dominio que lo guardamos de forma publica*/
      path: "/login",
      payload: {
        email:this.email,
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
        this.router.navigate(["/dasboard"])
      }
    })
    
  }

}
