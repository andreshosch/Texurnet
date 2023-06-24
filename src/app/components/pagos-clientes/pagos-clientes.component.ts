import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Pagos } from 'src/app/models/pagos';
import { Pago } from 'src/app/models/pago';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-pagos-clientes',
  templateUrl: './pagos-clientes.component.html',
  styleUrls: ['./pagos-clientes.component.css']
})
export class PagosClientesComponent {

  formPago:FormGroup

  displayedColumns: string[] = ['TipoMoneda', 'Monto','Cotizacion','Equivalencia','Fecha','Observaciones'];
  dataSource!: MatTableDataSource<Pago>;

  displayedColumns2: string[] = ['Cliente', 'Producto','Costo','Saldo'];
  dataSource2!: MatTableDataSource<Pagos>;

  cargaPago = false;

  listPagos: Pago[] = []
  // datos: Pagos

  unPago: Pago
  dosPago: Pago
  tresPago: Pago

  unPagos : Pagos

  laFecha = new Date;
  miArray = []

  constructor(){
    this.formPago = new FormGroup({
      tipoMoneda: new FormControl(),
      montoDolar: new FormControl(),
      montoPesos: new FormControl(),
      cotizacionActual: new FormControl(),
      observacion: new FormControl()
    })
  }

  ngOnInit(){
    this.cargarPagos()
    
  }

  calcularSaldo(arregloPago: Pago []): number{
    let suma = 0
    for (let i = 0; i < arregloPago.length; i++ ){
      console.log(`equivalencia: ${arregloPago[i].equivalencia} `)
      suma = suma + arregloPago[i].equivalencia
    }
    console.log(`suma ${suma}`)
    return suma
  }

  cargarPagos(){



    this.unPago = new Pago('Dolar', 100 , 1, 100, this.laFecha, 'Prueba1' )
    this.dosPago = new Pago('Pesos', 25000 , 490, 51, this.laFecha, 'Prueba2' )
    this.tresPago = new Pago('Dolar', 300 , 1, 300, this.laFecha, 'Prueba3' )

    this.unPagos = new Pagos('Juancito', 'LicenciaScany', 1500, 1500, this.calcularSaldo([this.unPago, this.dosPago, this.tresPago]), [this.unPago, this.dosPago, this.tresPago])



    // this.listPagos.push(this.unPago, this.dosPago, this.tresPago)


    for (let i = 0; i < this.unPagos.listaPagos.length; i++ ){
      this.listPagos.push(this.unPagos.listaPagos[i])  
    }


    this.dataSource = new MatTableDataSource(this.listPagos)
    this.dataSource2 = new MatTableDataSource([this.unPagos])
  }

  showModalPago(){
    this.cargaPago= true;
  }

  closeModalPago(){
    this.cargaPago= false;
  }

  chequear(valor){
    console.log(valor)
  }

  agregarPago(){


    let elMonto = 0
    let laCotizacion = 0
    if(this.formPago.get('tipoMoneda')?.value == 'Dolar'){
      elMonto = this.formPago.get('montoDolar')?.value
      laCotizacion = 1;
    }
    else {
      elMonto = this.formPago.get('montoPesos')?.value
      laCotizacion = this.formPago.get('cotizacionActual')?.value
    }

    const miPago: Pago = {
      moneda: this.formPago.get('tipoMoneda')?.value,
      monto: elMonto,
      cotizacion: laCotizacion,
      equivalencia: elMonto / laCotizacion,
      fecha: new Date,
      observacion: this.formPago.get('observacion')?.value,
    }
    console.log(miPago)
    

    this.formPago.reset()
    this.cargaPago = false
    
  }



}
