import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto.models';
import { ProductoService } from '../../services/producto.service';
import { faEdit, faTrash,faPlus } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: [
  ],
})
export class ProductosComponent implements OnInit {
faEdit = faEdit;
faTrash = faTrash;
faPlus = faPlus;
productos: Producto[] = [];
desde = 0;
totalRegistros = 0;
cargando = true;

  constructor(
    public _productoService : ProductoService
  ) { }

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.cargando = true;
    this._productoService.cargarProductos()
              .subscribe( (resp: any) => {
                console.log(resp.productos);
                this.totalRegistros = resp.total;
                this.productos = resp.productos;
                this.cargando = false;
              });
  }

  buscarProducto(termino:string){

    if(termino.length<=0){
      this.cargarProductos();
      return;
    }
    this.cargando = true;
    this._productoService.buscarProductos(termino)
            .subscribe((productos : Producto [])=>{
              this.productos = productos;
              this.cargando = false;
            });
  }
}
