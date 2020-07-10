import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Proveedor } from '../models/proveedor.models';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

        token: string;
        proveedor: Proveedor;
  
    constructor(
      public http: HttpClient,
      public router: Router
    ) {
      this.cargarStorage();
    }
    estaLogueado(){
      return (this.token.length > 5) ? true : false;
  }
  cargarStorage(){
    if (localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.proveedor = JSON.parse(localStorage.getItem('proveedor'));
    } else {
      this.token = '';
      this.proveedor = null;
    }
  }
  
  guardarStorage( id: string, token: string, proveedor: Proveedor ) {
  
    localStorage.setItem('id', id );
    localStorage.setItem('token', token );
    localStorage.setItem('proveedor', JSON.stringify(proveedor) );
  
    this.proveedor = proveedor;
    this.token = token;
    console.log(this.proveedor);
  }
  
  cargarProveedores(){
    const url = URL_SERVICIOS + '/proveedor';
    return this.http.get(url);
  }
  crearProveedor( proveedor: Proveedor) {
    let url = URL_SERVICIOS + '/proveedor';
    url += '?token=' + this.token;
  
    return this.http.post(url, proveedor)
    .pipe(
      map( ( resp: any) => {
        Swal.fire('Proveedor registrado', proveedor.nombre, 'success' );
        return resp.proveedor;
      }),
      catchError ((err: any) => {
      console.log(err);
      console.log(err.error.errors.message);
      const errores = err.error.errors.message;
      Swal.fire('Error al registrar proveedor', errores.substring(29) , 'error' );
      return  err.throw(err);
      }));  
  }
  buscarProveedor(termino: string){
    const url = URL_SERVICIOS + '/busqueda/coleccion/proveedor/' + termino;
  
    return this.http.get(url)
          .map((resp: any) => resp.proveedor);
  }
  
  actualizarProveedor( proveedor: Proveedor){
    let url = URL_SERVICIOS + '/proveedor/' + proveedor._id;
    url += '?token=' + this.token;
  
    return this.http.put (url, proveedor)
    .pipe(
      map( ( resp: any) => {
        Swal.fire('Proveedor actualizado', proveedor.nombre, 'success' );
        return resp.proveedor;
      }),
      catchError ((err: any) => {
      console.log(err);
      console.log(err.error.errors.message);
      const errores = err.error.errors.message;
      Swal.fire('Error al actualizar proveedor', errores.substring(29) , 'error' );
      return  err.throw(err);
      }));  
    }
  
  
  
  
  borrarProveedor(id: string){
    let url = URL_SERVICIOS + '/proveedor/' + id;
    url += '?token=' + this.token;
  
    return this.http.delete(url)
        .map(resp => {
            Swal.fire ('Proveedor Borrado', 'El proveedor fue eliminado correctamente', 'success');
            return true;
        });
  }
}