export class Proveedor {

    constructor(
        public nombre?: string,
        public direccion?:string,
        public email?: string,
        public cuit?: string,
        public telefono?:string,
        public situacion_afip?:string,
        public img?: string,
        // tslint:disable-next-line: variable-name
        public _id?: string,
    ){}

}