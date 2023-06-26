import { Pago } from "./pago";

export class Cliente {
    id?: string;
    nombre: string;
    apellido: string;
    ciudad: string;
    tipoLicencia: string;
    nroSerie: string;
    password: string;
    fechaLicencia:Date;
    saldo:number;
    costo:number;
    observaciones:string;
    productoActual?: Pago [];


    constructor(nombre: string, apellido: string, ciudad: string, tipoLicencia: string, nroSerie: string, password: string, fechaLicencia: Date,saldo:number,costo:number,observaciones:string, productoActual: Pago []) {

        this.nombre = nombre;
        this.apellido = apellido;
        this.ciudad = ciudad;
        this.tipoLicencia = tipoLicencia;
        this.nroSerie = nroSerie;
        this.password = password;
        this.fechaLicencia = fechaLicencia;
        this.saldo=saldo;
        this.costo=costo;
        this.observaciones=observaciones;
        this.productoActual = productoActual;
    }
}