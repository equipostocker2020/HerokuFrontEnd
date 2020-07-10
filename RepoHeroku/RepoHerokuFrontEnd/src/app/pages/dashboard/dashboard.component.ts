import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  usuario: Usuario;

  constructor(public _usuarioService: UsuarioService) { 
    this._usuarioService.cargarStorage();

    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit(): void {
  }

}
