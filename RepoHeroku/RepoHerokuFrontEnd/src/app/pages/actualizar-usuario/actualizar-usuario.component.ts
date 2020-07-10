import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.models';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-actualizar-usuario',
  templateUrl: './actualizar-usuario.component.html',
  styles: [
  ],
})
export class ActualizarUsuarioComponent implements OnInit {
   token: string;
   usuario: Usuario;
   id:string;


  constructor(
    public _usuarioService : UsuarioService,
    public router : Router
    ) {
    this.usuario = this._usuarioService.usuario;
    console.log(this.usuario);
    this._usuarioService.usuario;
     this.cargarStorage();
     this.guardarStorage(this._usuarioService.usuario._id, this._usuarioService.token, this.usuario);
  }

  ngOnInit(): void {

  }
 

  cargarStorage(){
    if (localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage( id: string,  token: string, usuario: Usuario ) {

    localStorage.setItem('id', this._usuarioService.usuario._id );
    localStorage.setItem('token', this._usuarioService.token );
    localStorage.setItem('usuario', JSON.stringify(usuario) );

    this.usuario = usuario;
    this.token = token;
    console.log(this.usuario);

  }


  guardar( usuario: Usuario){
      this.usuario.nombre = usuario.nombre;
      this.usuario.apellido = usuario.apellido;
      this.usuario.email = usuario.email;
      this.usuario.empresa = usuario.empresa;
      this.usuario.dni = usuario.dni;
      this.usuario.cuit = usuario.cuit;
      this.usuario.direccion = usuario.direccion;
      this._usuarioService.token = this.token;
    
      this._usuarioService.actualizarUsuario( this.usuario)
                  .subscribe( ( resp: any ) => {
                    this.router.navigate(['/usuarios']); 
                    console.log(resp);
                    
                  });

  }

}
