import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Isc } from 'src/app/models/isc';
import { IscService } from 'src/app/services/isc.service';
import { TranslateService } from '@ngx-translate/core'; 

@Component({
  selector: 'app-listar-isc',
  templateUrl: './listar-isc.component.html',
  styleUrls: ['./listar-isc.component.css']
})
export class ListarIscComponent {
  listIsc: Isc[] = []
  idDelete:string
 resultadoBusqueda:string
 public showConfirmationDialog=false
  displayedColumns: string[] = ['modelo', 'version', 'software', 'garantia', 'fechaActivacion','stock', 'acciones'];
  dataSource!: MatTableDataSource<Isc>;
  private paginator: MatPaginator;
  private sort: MatSort;



  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.paginator._intl.itemsPerPageLabel = this._translateService.instant('ISC_P_P')
    this.paginator._intl.firstPageLabel = this._translateService.instant('FIRST_PAGE')
    this.paginator._intl.previousPageLabel = this._translateService.instant('PAGE_AFT')
    this.paginator._intl.nextPageLabel = this._translateService.instant('PAGE_NEXT')
    this.paginator._intl.lastPageLabel = this._translateService.instant('PAGE_LAST')
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(private _iscService: IscService,private _snackBar: MatSnackBar, private _translateService: TranslateService) {
    this.dataSource = new MatTableDataSource(this.listIsc);
  }
  ngOnInit() {
    this.cargarIsc()
    
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase()
 }

 verIsc(element:any){
  const minuscula=element.modelo.toLowerCase()
  switch(true){
    case minuscula.includes('verde'):
   window.open("https://www.iscsystems.it/es/productos?view=item&id_item=8",'_blank')
   break;
   case minuscula.includes('blu'):
    window.open("https://www.iscsystems.it/es/productos?view=item&id_item=7",'_blank')
    break;
    case minuscula.includes('rosso'):
    window.open("https://www.iscsystems.it/es/productos?view=item&id_item=6",'_blank')
    break;
    case minuscula.includes('oro'):
      window.open("https://www.iscsystems.it/es/productos?view=item&id_item=5",'_blank')
      break;
      case minuscula.includes('pro'):
        window.open("https://www.iscsystems.it/es/productos?view=item&id_item=9",'_blank')
        break;
  }
 }

cargarIsc() {
  this._iscService.getIsc().subscribe(doc=>{
    this.listIsc=[]
    this.dataSource = new MatTableDataSource(this.listIsc)
    doc.forEach((element: any) => {
      this.listIsc.push({
        id: element.payload.doc.id,
        ... element.payload.doc.data()
      })
    });
  })
}

eliminarIsc(element:any){
  this.showConfirmationDialog = true;
  this.idDelete = element;
  }
confirm(){
  this._iscService.deleteIsc(this.idDelete).then(()=>{
    this._snackBar.open(this._translateService.instant('ISC_ELIMINADO_CORRECTAMENTE'), '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          })
        }, error => {
          console.log(error)
        });
       
        this.showConfirmationDialog=false
        this.paginator.length=this.paginator.length-1
        
}

formatoFecha(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  return `${day}/${month}/${year}`;
}
}


