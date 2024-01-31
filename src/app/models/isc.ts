export class Isc {
    modelo: string;
    version: string;
    software: string;
    garantia: string;
    fechaActivacion: Date;
    stock: string;


constructor(modelo: string, version: string, software: string, garantia: string, fechaActivacion: Date, stock: string) {

    this.modelo = modelo;
    this.version = version;
    this.software = software;
    this.garantia = garantia;
    this.fechaActivacion = fechaActivacion;
    this.stock = stock
}
}