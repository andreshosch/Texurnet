export class Cliente {
    id?: string;
    nombre: string;
    apellido: string;
    ciudad: string;
    tipoLicencia: string;
    nroSerie: string;
    password: string;
    fechaLicencia:Date

    constructor(nombre: string, apellido: string, ciudad: string, tipoLicencia: string, nroSerie: string, password: string, fechaLicencia: Date) {

        this.nombre = nombre;
        this.apellido = apellido;
        this.ciudad = ciudad;
        this.tipoLicencia = tipoLicencia;
        this.nroSerie = nroSerie;
        this.password = password;
        this.fechaLicencia = fechaLicencia;
    }
}