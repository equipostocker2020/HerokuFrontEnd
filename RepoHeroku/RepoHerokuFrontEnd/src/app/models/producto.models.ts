import { Proveedor } from './proveedor.models';
export class Producto {

    constructor(
        public nombre?: string,
        public descripcion?:string,
        public stock?: string,
        public precio?: string,
        public proveedor?:Proveedor,
        public img?: string,
        public _id?: string,
        // tslint:disable-next-line: variable-name
    ){}

}