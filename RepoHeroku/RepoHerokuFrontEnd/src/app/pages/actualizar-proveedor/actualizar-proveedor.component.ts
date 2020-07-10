import { Component, OnInit } from '@angular/core';
import { ProveedorService } from '../../services/proveedor.service';
import { Proveedor } from '../../models/proveedor.models';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-proveedor',
  templateUrl: './actualizar-proveedor.component.html',
  styles: [
  ],
})
export class ActualizarProveedorComponent implements OnInit {
   token: string;
   proveedor: Proveedor;
   id:string;


  constructor(
    public _proveedorService : ProveedorService,
    public _usuarioService : UsuarioService,
    public router : Router
    ) {
    this.proveedor = this._proveedorService.proveedor;
    console.log(this.proveedor);
    this._usuarioService.usuario;
     this.cargarStorage();
     this.guardarStorage(this._usuarioService.usuario._id, this._usuarioService.token, this.proveedor);
  }

  ngOnInit(): void {

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

  guardarStorage( id: string,  token: string, proveedor: Proveedor ) {

    localStorage.setItem('id', this._usuarioService.usuario._id );
    localStorage.setItem('token', this._usuarioService.token );
    localStorage.setItem('proveedor', JSON.stringify(proveedor) );

    this.proveedor = proveedor;
    this.token = token;
    console.log(this.proveedor);

  }


  guardar( proveedor: Proveedor){
      this.proveedor.nombre = proveedor.nombre;
      this.proveedor.direccion = proveedor.direccion;
      this.proveedor.cuit = proveedor.cuit;
      this.proveedor.email = proveedor.email;
      this.proveedor.telefono = proveedor.telefono;
      this.proveedor.situacion_afip = proveedor.situacion_afip;
      this._usuarioService.token = this.token;
    
      this._proveedorService.actualizarProveedor( this.proveedor)
                  .subscribe( ( resp: any ) => {
                    this.router.navigate(['/proveedores']);
                    console.log(resp);

                  });

  }

}
