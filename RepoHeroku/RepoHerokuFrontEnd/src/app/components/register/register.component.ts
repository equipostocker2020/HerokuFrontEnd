import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.models';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: []
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  sonInguales(campo1: string, campo2: string){

    return (group: FormGroup) => {
      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;
      if (pass1 === pass2){
        return null;
      }
      return {
        sonIguales: true
      };
    };

  }

  ngOnInit() {
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      apellido: new FormControl(null, Validators.required),
      empresa: new FormControl (null, Validators.required ),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password : new FormControl(null, Validators.required),
      password2 : new FormControl(null, Validators.required),
      dni: new FormControl (null, Validators.required ),
      cuit: new FormControl (null, Validators.required ),
      direccion: new FormControl (null, Validators.required ),
      telefono: new FormControl (null, Validators.required ),
      condiciones: new FormControl( false),
    }, {validators: this.sonInguales('password', 'password2')  }  );

    this.forma.setValue({
      nombre: '',
      apellido: '',
      empresa: '',
      email: '',
      password: '',
      password2: '',
      dni: '',
      cuit: '',
      direccion: '',
      telefono: '',
      condiciones: true
    });

  }

  registrarUsuario(){
    if (this.forma.invalid){
      return;
    }
    if (!this.forma.value.condiciones){
    // sweetAlert
      Swal.fire('Importante', 'Debe aceptar las condiciones', 'warning');
      return;
    }
    console.log(this.forma.value);

    // creando usuario a partir de modelo y forma del register html.
    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.apellido,
      this.forma.value.email,
      this.forma.value.empresa,
      this.forma.value.password,
      this.forma.value.dni,
      this.forma.value.cuit,
      this.forma.value.telefono,
      this.forma.value.direccion,
    );
      // llamando al servicio y metodo para crear usuario
    this._usuarioService.crearUsuario(usuario)
            .subscribe( resp => {
              console.log(resp);
              this.router.navigate(['/login']);
            });
  }

}
