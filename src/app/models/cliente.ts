export class Cliente {
    id?: string;
    nombre: string;
    apellido: string;
    ciudad: string;
    tipoLicencia: string;
    nroSerie: string;
    password: string;
    tiempo: string;
    fechaLicencia:Date

    constructor(nombre: string, apellido: string, ciudad: string, tipoLicencia: string, nroSerie: string, password: string,tiempo:string, fechaLicencia: Date) {

        this.nombre = nombre;
        this.apellido = apellido;
        this.ciudad = ciudad;
        this.tipoLicencia = tipoLicencia;
        this.nroSerie = nroSerie;
        this.password = password;
        this.tiempo=tiempo
        this.fechaLicencia = fechaLicencia;
    }
}