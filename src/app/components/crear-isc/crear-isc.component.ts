import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Isc } from 'src/app/models/isc';
import { IscService } from 'src/app/services/isc.service';

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
  titulo = 'Crear Isc';
  minimo:Date


  constructor(private fb: FormBuilder, private _iscService: IscService, private router: Router, private _snackBar: MatSnackBar, private aRouter: ActivatedRoute) {
    this.formIsc = this.fb.group({
      modelo: ['', Validators.required],
      version: ['', Validators.required],
      software: ['', Validators.required],
      garantia: ['', Validators.required],
      fechaActivacion: ['', Validators.required],
      stock: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
    this.minimo=new Date()

  }

  ngOnInit(): void {
    this.editarIsc();
  
  }

  agregarIsc() {

    const isc: Isc = {
      modelo: this.formIsc.get('modelo')?.value,
      version: this.formIsc.get('version')?.value,
      software: this.formIsc.get('software')?.value,
      garantia: this.formIsc.get('garantia')?.value,
      fechaActivacion: this.formIsc.get('fechaActivacion')?.value,
      stock: this.formIsc.get('stock')?.value,
    }
    if (this.prueba.href == "http://localhost:4200/crearIsc") {
      // if(this.prueba.href=="http://localhost:4200/crearCliente"){
      this._iscService.createIsc(isc).then(() => {
        this._snackBar.open('El Isc fue agregado con exito', '', {
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
          this._snackBar.open('El Isc fue actualizado con exito', '', {
            duration: 1500,
            horizontalPosition: 'center',
          })
          this.listIsc = data
        }, error => {
          console.log(error)

        })
      }
    }

  }

  editarIsc() {
    if (this.id !== null) {
      this.titulo = 'Datos Isc'
      this._iscService.getIscById(this.id).subscribe(data => {
        this.formIsc.setValue({
          modelo: data.modelo,
          version: data.version,
          software: data.software,
          garantia: data.garantia,
          fechaActivacion: data.fechaActivacion.toDate(),
          stock: data.stock,
        })

      })
    }
  }
}
