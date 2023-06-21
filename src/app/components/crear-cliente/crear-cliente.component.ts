import { Component } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente} from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent {
  form:FormGroup
  loading=false
  titulo='Crear Cliente';
  id: string|null
  listClientes:Cliente[]=[]
  minimo:Date
  maximo:Date
  botonbloqueado=true;
  botonVisible=false
  showConfirmationDialog= true

  constructor( private fb:FormBuilder, private _clienteService: ClienteService, private router:Router,private _snackBar:MatSnackBar,private aRouter:ActivatedRoute){
    this.minimo = new Date(); 
    this.maximo = new Date();
    this.minimo.setFullYear(this.minimo.getFullYear() -100);
    this.form=this.fb.group({
      nombre:['',Validators.required],
      apellido:['',Validators.required],
      ciudad:['',Validators.required],
      tipoLicencia:['',Validators.required],
      nroSerie:['',Validators.required],
      password:['',Validators.required],
      fechaLicencia:['',Validators.required]
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  
  }

  ngOnInit(): void {
    this.editarCliente();
  }

  agregarCliente() {
    const client: Cliente = {
      nombre: this.form.get('nombre')?.value,
      apellido: this.form.get('apellido')?.value,
      ciudad: this.form.get('ciudad')?.value,
      tipoLicencia: this.form.get('tipoLicencia')?.value,
      nroSerie: this.form.get('nroSerie')?.value,
      password: this.form.get('password')?.value,
      fechaLicencia: this.form.get('fechaLicencia')?.value,
      montoAcumulado:0,
      montoInicial:0,
      observaciones:" "
    }
    let prueba=window.location;
    if(prueba.href=="http://localhost:4200/crearCliente"){
    this._clienteService.createClient(client).then(() => {
      this._snackBar.open('El cliente fue agregado con exito', '', {
        duration: 1500,
        horizontalPosition: 'center',
      })
      setTimeout(() => {
        this.router.navigate(['clientes'])
      }, 2000);
        
    }, error => {
      console.log(error)
      
    })
  }
  else{
    if (this.id!==null){
      this._clienteService.updateClient(this.id,client).then(data=>{
        this._snackBar.open('El cliente fue actualizado con exito', '', {
          duration: 1500,
          horizontalPosition: 'center',
        })
          this.listClientes=data
          setTimeout(() => {
            this.router.navigate(['clientes'])
          }, 2000);
      }, error => {
        console.log(error)
        
      })
        
    }
  }
}

  editarCliente(){
    if (this.id !== null) {
      this.titulo = 'Datos Cliente'
      this.botonVisible=true
      this._clienteService.getClientsById(this.id).subscribe(data => {
        this.form.setValue({
          nombre: data.nombre,
          apellido: data.apellido,
          ciudad: data.ciudad,
          tipoLicencia: data.tipoLicencia,
          nroSerie: data.nroSerie,
          password: data.password,
          fechaLicencia:data.fechaLicencia.toDate()
        })
      })
    }
  }
  ocultarMostrarBotones() {
    this.botonVisible = !this.botonVisible;
    this.showConfirmationDialog=false;
  }
} 




 
