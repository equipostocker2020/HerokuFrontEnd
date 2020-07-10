import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.models';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {
  usuario: Usuario; 
  faEdit = faEdit;
  faPlus = faPlus;
  faTrash = faTrash;
  usuarios: Usuario[] = [];
  desde = 0;
  totalRegistros = 0;
  cargando = true;
  token: string;

  constructor(
    public _usuarioService: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }
  cargarUsuarios(){

    this.cargando = true;

    this._usuarioService.cargarUsuarios(this.desde)
        .subscribe( (resp: any) => {
          console.log(resp);
          this.totalRegistros = resp.total;
          this.usuarios = resp.usuarios;
          this.cargando = false;
        });
  }
  buscarUsuario(termino: string){

    if (termino.length <= 0){
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this._usuarioService.buscarUsuario(termino)
            .subscribe((usuarios: Usuario []) => {
              this.usuarios = usuarios;
              this.cargando = false;
            });
  }
  guardarUsuario(usuario: Usuario){
    this._usuarioService.actualizarUsuario(usuario)
            .subscribe();
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id );
    localStorage.setItem('token', token );
    localStorage.setItem('usuario', JSON.stringify(usuario) );

    this.usuario = usuario;
    this.token = token;
    console.log(this.usuario);
  }

  borrarUsuario(usuario: Usuario){
    console.log(usuario);
    if (usuario._id === this._usuarioService.usuario._id){
      Swal.fire('No puede borrar usuario', 'No se puede borrar a si mismo...' , 'error');
      return;
    }
    Swal.fire({
      title: ' Esta seguro?',
      text: ' Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6'
    })
    .then(borrar => {
      if ( borrar.value){
        this._usuarioService.borrarUsuario(usuario._id)
                .subscribe(borrado  => {
                  console.log(borrado);
                  this.cargarUsuarios();
                });
      }
    });
  }
}

