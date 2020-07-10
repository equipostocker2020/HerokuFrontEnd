import { Component, OnInit, EventEmitter } from '@angular/core';
import { Usuario } from '../../models/usuario.models';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ],
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string  | ArrayBuffer ;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) {
    this.usuario = this._usuarioService.usuario;
    console.log(this.usuario);
  }

  ngOnInit(): void {
  }

  guardar( usuario: Usuario){
   this.usuario.nombre = usuario.nombre;
   this.usuario.apellido = usuario.apellido;
   this.usuario.email = usuario.email;
   this.usuario.empresa = usuario.empresa;
   this.usuario.telefono = usuario.telefono;
   this.usuario.direccion = usuario.direccion;

   this._usuarioService.actualizarUsuario( this.usuario)
               .subscribe((resp: any) => {
                    console.log(resp);
                    // this.router.navigate['/profile', usuario._id];
               });
   console.log(usuario);
  }

  seleccionImagen( archivo: File){

    if (!archivo){
      this.imagenSubir = null;
      return;
    }
    if ( archivo.type.indexOf('image') < 0){
      Swal.fire('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;

    const reader = new FileReader() ;
    const urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  // cambiarImagen(){
  //   this._usuarioService.cambiarImagen (this.imagenSubir, this.usuario._id);
  // }


}
