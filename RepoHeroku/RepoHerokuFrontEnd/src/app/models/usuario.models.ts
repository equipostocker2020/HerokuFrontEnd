/**
 * Clase generada para obtener el mismo model que el backend
 * se mapean los campos para poder utilizarlos instanciandola las veces que la app lo requiera
 * @author: Stocker
*/

export class Usuario {

    constructor(
        public nombre?: string,
        public apellido?: string,
        public email?: string,
        public empresa?: string,
        public password?: string,
        public dni?: string,
        public cuit?: string,
        public telefono?: string,
        public direccion?: string,
        public img?: string,
        public role?: string,
        public _id?: string,
    ){}

}
