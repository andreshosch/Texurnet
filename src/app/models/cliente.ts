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
    montoAcumulado:number;
    montoInicial:number;
    observaciones:string;
    productoActual?: Pago [];
    historico?: Pago [];





    constructor(nombre: string, apellido: string, ciudad: string, tipoLicencia: string, nroSerie: string, password: string, fechaLicencia: Date,montoAcumulado:number,montoInicial:number,observaciones:string, productoActual: Pago [], historico: Pago []) {

        this.nombre = nombre;
        this.apellido = apellido;
        this.ciudad = ciudad;
        this.tipoLicencia = tipoLicencia;
        this.nroSerie = nroSerie;
        this.password = password;
        this.fechaLicencia = fechaLicencia;
        this.montoAcumulado=montoAcumulado;
        this.montoInicial=montoInicial;
        this.observaciones=observaciones;
        this.productoActual = productoActual;
        this.historico = historico;
    }
}