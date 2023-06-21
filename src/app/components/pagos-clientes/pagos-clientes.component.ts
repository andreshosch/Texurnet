import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Pagos } from 'src/app/models/pagos';
import { Pago } from 'src/app/models/pago';

@Component({
  selector: 'app-pagos-clientes',
  templateUrl: './pagos-clientes.component.html',
  styleUrls: ['./pagos-clientes.component.css']
})
export class PagosClientesComponent {

  displayedColumns: string[] = ['TipoMoneda', 'Monto','Cotizacion','Equivalencia','Fecha','Observaciones'];
  dataSource!: MatTableDataSource<Pago>;

  displayedColumns2: string[] = ['Cliente', 'Producto','Costo','Saldo'];
  dataSource2!: MatTableDataSource<Pagos>;

  listPagos: Pago[] = []
  // datos: Pagos

  unPago: Pago
  dosPago: Pago
  tresPago: Pago

  unPagos : Pagos

  laFecha = new Date;
  miArray = []

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

}
