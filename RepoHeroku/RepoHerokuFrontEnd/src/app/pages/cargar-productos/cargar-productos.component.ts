import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { ProductoService } from '../../services/producto.service';
import { Router } from '@angular/router';
import { Producto } from '../../models/producto.models';
import { Proveedor } from '../../models/proveedor.models';
import { ProveedorService } from '../../services/proveedor.service';


@Component({
  selector: 'app-cargar-productos',
  templateUrl: './cargar-productos.component.html',
  styleUrls: []
})
export class CargarProductosComponent implements OnInit {
  
  forma: FormGroup;
  proveedores: Proveedor[] = [];
  producto: Producto;

  constructor(
    public _productoService : ProductoService,
    public router: Router,
    public _proveedorService :ProveedorService
  ) { }

  ngOnInit() {
    this._proveedorService.cargarProveedores()
            .subscribe((resp:any) =>{
              this.proveedores = resp.proveedor;
              console.log(resp.proveedor);
            });
    

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      descripcion: new FormControl (null, Validators.required ),
      stock: new FormControl(null, [Validators.required, Validators.email]),
      precio: new FormControl (null, Validators.required ),
      proveedor: new FormControl (null, Validators.required ),
     
    } );


    this.forma.setValue({
      nombre: '',
      descripcion: '',
      stock: '',
      precio: '',
       proveedor: '',
    });
    // console.log(this.forma);
  
  }
 
  registrarProducto(){
    // if (this.forma.invalid){
    //   Swal.fire('Cuidado','Esta ingresando algun dato erroneo','warning');
    //   return;
    // }
    console.log(this.forma.value.proveedor);
    console.log(this.forma.value);

    // creando usuario a partir de modelo y forma del register html.
    const producto = new Producto(
      this.forma.value.nombre,
      this.forma.value.descripcion,
      this.forma.value.stock,
      this.forma.value.precio,
      this.forma.value.proveedor,

    );

    this._productoService.crearProducto(producto)
          .subscribe( resp => {
            console.log(resp);
            this.router.navigate (['/productos']);
          });

}
}
