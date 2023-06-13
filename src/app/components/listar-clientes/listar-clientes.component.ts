import { DatePipe } from '@angular/common';
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


  displayedColumns: string[] = ['nombre', 'apellido','ciudad', 'tiempo', 'fechaLicencia','acciones'];
  dataSource!: MatTableDataSource<Cliente>;

  hayLicenciasAlLimite: boolean= false;
  myColor: string ='grey'

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


  constructor(private _clienteService: ClienteService, private _snackBar: MatSnackBar
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
        this.ejecutar(element.payload.doc.data().fechaLicencia) 
        // this.ejecutar(doc.data().fechaLicencia)
        this.listClientes.push({
          id: element.payload.doc.id,
          ... element.payload.doc.data()
        })
        // this.ejecutar(element.payload.doc.data().fechaLicencia)
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
        this.hayLicenciasAlLimite= false;
      }

      ejecutar(dato){
        let buscarLicencias = dato.toDate()
        let dias =this.calcularDiferencia(buscarLicencias)
        if(dias < 31){
          this.hayLicenciasAlLimite = true  
        }
        if(dias < 0){
          this.myColor = 'lightcoral'
        } else if(dias < 16){
          this.myColor = 'lightyellow'
        }else if(dias < 31){
          this.myColor = 'lightsalmon'
        } else {
          this.myColor = 'white'
        }
        console.log(`myColor: ${this.myColor}`)
      }
      
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

        return Math.floor(differenceInDays);
      }

      confirm(){
        this.hayLicenciasAlLimite = false;
      }

      formatoFecha(date: Date): string {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
      
        return `${day}/${month}/${year}`;
      }

}

