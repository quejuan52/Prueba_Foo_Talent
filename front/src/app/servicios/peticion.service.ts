import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeticionService {

  constructor(private http:HttpClient) {}

  UrlHost:string= 'http://localhost:3000' //variable de forma publica 

/*$$$$$$$$$$$$$$$$$$$$$ PETICIONES $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */

Post(url:string, payload:{}){
  let promise = new Promise((resolve, reject) => {

    this.http.post(url,payload)
    .toPromise()
    .then((res:any) => {
      resolve(res)
    }).catch((error:any) => {
      reject(error)
    })
  })
  return promise
}
Get(url:string){ //para el get toda la informacion viaja por la URL y no tiene payload

  let promise = new Promise((resolve, reject)=>{

    this.http.get(url)
    .toPromise()
    .then((res:any)=>{
      console.log(res)
      resolve(res)
    }).catch((error:any)=>{
      reject(error)
    })
  })
  return promise
}
Put(url:string,payload:{}){

  let promise = new Promise((resolve, reject)=>{

    this.http.put(url,payload)
    .toPromise()
    .then((res:any)=>{
      console.log(res)
      resolve(res)
    }).catch((error:any)=>{
      resolve(error)
    })
  })
  return promise
}

Delete(url:string,payload:{}){

  let promise = new Promise((resolve, reject)=>{

    this.http.delete(url,payload)
    .toPromise()
    .then((res:any)=>{
      console.log(res)
      resolve(res)
    }).catch((error:any)=>{
      resolve(error)
    })
  })
  return promise
}
}