export class Pago {
    moneda: string;
    monto: number;
    cotizacion: number;
    equivalencia: number;
    fecha: Date;
    observacion: string;



    constructor(moneda: string, monto: number, cotizacion: number, equivalencia: number, fecha: Date, observacion: string) {

        this.moneda = moneda;
        this.monto = monto;
        this.cotizacion = cotizacion;
        this.equivalencia = equivalencia;
        this.fecha = fecha;
        this.observacion = observacion
    }
}