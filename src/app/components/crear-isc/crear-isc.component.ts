import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Isc } from 'src/app/models/isc';
import { IscService } from 'src/app/services/isc.service';
import { TranslateService } from '@ngx-translate/core'; 

@Component({
  selector: 'app-crear-isc',
  templateUrl: './crear-isc.component.html',
  styleUrls: ['./crear-isc.component.css']
})
export class CrearIscComponent {
  formIsc: FormGroup
  prueba = window.location;
  listIsc: Isc[] = []
  id: string | null
  edicionIsc: boolean = true
  altaIsc: boolean = false
  textoTextarea: string = '';



  constructor(private fb: FormBuilder, private _iscService: IscService, private router: Router, private _snackBar: MatSnackBar, private aRouter: ActivatedRoute, private _translateService: TranslateService) {
    this.formIsc = this.fb.group({
      modelo: ['', Validators.required],
      version: ['', Validators.required],
      nroSerie: ['', Validators.required],
      nombreCliente: ['', Validators.required],
      garantia: ['', Validators.required],
      fechaActivacion: ['', Validators.required],
      stock: ['', Validators.required],
      codigoActivacion: ['', Validators.required],
      codigoActualizacion: ['', Validators.required],
      observaciones: [''],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');

  }

  ngOnInit(): void {
    this.editarIsc();
  
  }

  agregarIsc() {

    const isc: Isc = {
      modelo: this.formIsc.get('modelo')?.value,
      version: this.formIsc.get('version')?.value,
      nroSerie: this.formIsc.get('nroSerie')?.value,
      nombreCliente: this.formIsc.get('nombreCliente')?.value,
      garantia: this.formIsc.get('garantia')?.value,
      fechaActivacion: this.formIsc.get('fechaActivacion')?.value,
      stock: this.formIsc.get('stock')?.value,
      codigoActivacion: this.formIsc.get('codigoActivacion')?.value,
      codigoActualizacion: this.formIsc.get('codigoActualizacion')?.value,
      observaciones: this.formIsc.get('observaciones')?.value,
    }
    if (this.prueba.href == "http://localhost:4200/crearIsc") {
      // if(this.prueba.href=="http://localhost:4200/crearCliente"){
      this._iscService.createIsc(isc).then(() => {
          this._snackBar.open(this._translateService.instant('ISC_ADD'), '', {
          duration: 1500,
          horizontalPosition: 'center',
        })
        setTimeout(() => {
          this.router.navigate(['isc'])
        }, 2000);

      }, error => {
        console.log(error)

      })

    }
    else {

      if (this.id !== null) {

        this._iscService.updateIsc(this.id, isc).then(data => {
          
          this._snackBar.open(this._translateService.instant('ISC_UPDATE'), '', {
            duration: 1500,
            horizontalPosition: 'center',
          })
          setTimeout(() => {
            this.router.navigate(['isc'])
          }, 2000);
  
          this.listIsc = data
        }, error => {
          console.log(error)

        })
      }
    }

  }

  editarIsc() {
    if (this.id !== null) {
      this.edicionIsc = true
      this.altaIsc = false
      this._iscService.getIscById(this.id).subscribe(data => {
        this.formIsc.setValue({
          modelo: data.modelo,
          version: data.version,
          nroSerie: data.nroSerie,
          nombreCliente:data.nombreCliente,
          garantia: data.garantia,
          fechaActivacion: data.fechaActivacion.toDate(),
          stock: data.stock,
          codigoActivacion:data.codigoActivacion,
          codigoActualizacion:data.codigoActivacion,
          observaciones:data.observaciones
        })

      })
    }
    else{
      this.edicionIsc = false
      this.altaIsc = true
    }
  }
}
