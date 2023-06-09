import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/models/cliente'
import { ClienteService } from 'src/app/services/cliente.service';




@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css']
})
export class ClienteComponent {
  listClientes: Cliente[] = []
  fecha=new Date().getTime();


  displayedColumns: string[] = ['nombre', 'apellido','ciudad', 'tipoLicencia', 'nroSerie', 'password', 'tiempo', 'fechaLicencia','acciones'];
  dataSource!: MatTableDataSource<Cliente>;

  private paginator: MatPaginator; 
  private sort: MatSort;

    

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();


}

@ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
  this.paginator = mp;
  this.paginator._intl.itemsPerPageLabel='Clientes por Página'
  this.paginator._intl.firstPageLabel="Primera Página"
  this.paginator._intl.previousPageLabel="Página Anterior"
  this.paginator._intl.nextPageLabel='Siguiente Página'
  this.paginator._intl.lastPageLabel="Última Página"
  this.setDataSourceAttributes();
}

setDataSourceAttributes() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
  }


  constructor(private _clienteService: ClienteService, private _snackBar: MatSnackBar,
    ) {
    this.dataSource = new MatTableDataSource(this.listClientes);
  }

  ngOnInit() {
      this.cargarCliente()
  }

  ngAfterViewInit() {


  }

applyFilter(event: Event) {
 const filterValue = (event.target as HTMLInputElement).value;
 this.dataSource.filter = filterValue.trim().toLowerCase()
}


   cargarCliente() {
    this._clienteService.getClients().subscribe(doc=>{
      this.listClientes=[]
      this.dataSource = new MatTableDataSource(this.listClientes) 
      doc.forEach((element: any) => {
        this.listClientes.push({
          id: element.payload.doc.id,
          ... element.payload.doc.data()
        })
      });
    })
  }
eliminarCliente(id:any){
  this._clienteService.deleteClient(id).then(()=>{
    this._snackBar.open('El usuario ha sido eliminado correctamente', '', {
             duration: 1500,
             horizontalPosition: 'center',
             verticalPosition: 'bottom'
           })
         }, error => {
           console.log(error)
         });
       }

      //  calcularDiferencia(fecha2:any) {
      //   console.log(fecha2)
      //   console.log(this.fecha)
      //   let fecha3=(this.fecha-fecha2)
      //   console.log(fecha3)
      //   const fecha4=(fecha3/86400000)
      //   console.log(fecha4)
      // }
       
      calcularDiferencia(date: Date): number {

       

 // Mostrará la diferencia en días entre la fecha pasada y la fecha actual
        const currentDate = new Date();
        const inputDate = new Date(date);
        
        // Convertir las fechas a tiempo en milisegundos
        const currentTimestamp = currentDate.getTime();
        const inputTimestamp = inputDate.getTime();
        
        // Calcular la diferencia en milisegundos
        const difference =   inputTimestamp-currentTimestamp;
        
        // Convertir la diferencia en días
        const differenceInDays = Math.floor(difference / (1000 * 60 * 60 * 24));
       
        console.log(`Dias de diferencia: ${differenceInDays}`)
        
        return Math.floor(differenceInDays);
      }
       }

