export class Isc {
    modelo: string;
    version: string;
    nroSerie:string;
    nombreCliente:string;
    garantia: string;
    fechaActivacion: Date;
    stock: string;
    codigoActivacion:string;
    codigoActualizacion:string;
    observaciones:string


constructor(modelo: string, version: string, nroSerie: string, nombrecliente:string, garantia: string, fechaActivacion: Date, stock: string, codigoActivacion:string,codigoActualizacion:string,observaciones:string) {

    this.modelo = modelo;
    this.version = version;
    this.nroSerie=nroSerie;
    this.nombreCliente=nombrecliente;
    this.garantia = garantia;
    this.fechaActivacion = fechaActivacion;
    this.stock = stock;
    this.codigoActivacion=codigoActivacion;
    this.codigoActualizacion=codigoActualizacion
    this.observaciones=observaciones
}
}