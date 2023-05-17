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
  listAlumnos: Cliente[] = []


  displayedColumns: string[] = ['nombre', 'apellido','ciudad', 'tipoLicencia', 'nroSerie', 'password', 'tiempo', 'fechaLicencia','acciones'];
    dataSource!: MatTableDataSource<any>;

   @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort



  constructor(private _clienteService: ClienteService, private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
      this.cargarCliente()
  }
  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    console.log(this.dataSource.paginator)
    console.log("Paginator" + this.paginator)
    this.dataSource.sort = this.sort;
}

applyFilter(event: Event) {
 const filterValue = (event.target as HTMLInputElement).value;
 this.dataSource.filter = filterValue.trim().toLowerCase()
}


   cargarCliente() {
    this._clienteService.getClients().subscribe(doc=>{
      this.listAlumnos=[]
      this.dataSource = new MatTableDataSource(this.listAlumnos) 
      doc.forEach((element: any) => {
        this.listAlumnos.push({
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
  }
