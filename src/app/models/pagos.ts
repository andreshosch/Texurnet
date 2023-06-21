import { Pago } from "./pago";

export class Pagos {
    id: string;
    producto: string;
    costo: number;
    saldo: number;
    suma: number;
    listaPagos?: Pago []



    constructor(id: string, producto: string, costo: number, saldo: number, suma: number, listaPagos: Pago []) {
        this.id = id;
        this.producto = producto;
        this.costo = costo;
        this.saldo = saldo;
        this.suma = suma;
        this.listaPagos = listaPagos;
    }
}