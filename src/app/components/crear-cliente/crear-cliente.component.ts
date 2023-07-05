import { Component } from '@angular/core';
import { FormBuilder,FormControl,FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente} from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { Pago } from 'src/app/models/pago';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css'],
})
export class CrearClienteComponent {
  cargaPago: boolean = false
  formPago:FormGroup
  displayedColumns: string[] = ['TipoMoneda', 'Monto','Cotizacion','Equivalencia','Fecha','Observaciones','Acciones'];
  dataSource!: MatTableDataSource<Pago>;
  listPagos: Pago[] = []

  hayCliente: boolean = false;
  conversion: boolean = true;
  montoIncorrecto: boolean = false;

  form:FormGroup
  loading=false
  titulo='Crear Cliente';
  id: string|null
  listClientes:Cliente[]=[]
  minimo:Date
  maximo:Date
  showConfirmationDialog= true
  ocultarMatTab=true
  prueba=window.location;
  selectOption:string;
  modalSaldo=false
  hideSaldo=false
  saldoBloq=false

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
      fechaLicencia:['',Validators.required],
      observaciones:[''],
      costo:['',Validators.required],

      saldo:['']
    })

    this.id = this.aRouter.snapshot.paramMap.get('id');
  
    this.formPago = new FormGroup({
      tipoMoneda: new FormControl(),
      montoDolar: new FormControl(),
      montoPesos: new FormControl(),
      cotizacionActual: new FormControl(),
      observacion: new FormControl()
    })
  }

  ngOnInit(): void {
    this.editarCliente();
    this.mostrartab()
  }

  agregarCliente() {
    this.showConfirmationDialog= false
    this.hideSaldo=false
      const client: Cliente = {
      nombre: this.form.get('nombre')?.value,
      apellido: this.form.get('apellido')?.value,
      ciudad: this.form.get('ciudad')?.value,
      tipoLicencia: this.form.get('tipoLicencia')?.value,
      nroSerie: this.form.get('nroSerie')?.value,
      password: this.form.get('password')?.value,
      fechaLicencia: this.form.get('fechaLicencia')?.value,
      observaciones: this.form.get('observaciones')?.value,
      saldo:this.form.get('costo')?.value,
      costo:this.form.get('costo')?.value,
      productoActual: this.listPagos
    }
    if(this.prueba.href="https://sistema-texurnet.web.app/clientes"){
    // if(this.prueba.href=="http://localhost:4200/crearCliente"){
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
      this.hayCliente= true
      this.hideSaldo=true
      if(this.calcularSaldo(client.costo, client.productoActual)>=0){
      this._clienteService.updateClient(this.id,client).then(data=>{
        this._snackBar.open('El cliente fue actualizado con exito', '', {
          duration: 1500,
          horizontalPosition: 'center',
        })
          this.listClientes=data
      }, error => {
        console.log(error)
        
      })
    }
    else{
      this.modalSaldo=true
    }  
    }
  }
}
  createPago() {
    {
      this.showConfirmationDialog = false
      this.hideSaldo = false
      const client: Cliente = {
        nombre: this.form.get('nombre')?.value,
        apellido: this.form.get('apellido')?.value,
        ciudad: this.form.get('ciudad')?.value,
        tipoLicencia: this.form.get('tipoLicencia')?.value,
        nroSerie: this.form.get('nroSerie')?.value,
        password: this.form.get('password')?.value,
        fechaLicencia: this.form.get('fechaLicencia')?.value,
        observaciones: this.form.get('observaciones')?.value,
        saldo: this.form.get('costo')?.value,
        costo: this.form.get('costo')?.value,
        productoActual: this.listPagos
      }
      if(this.prueba.href="https://sistema-texurnet.web.app/clientes"){
      // if (this.prueba.href == "http://localhost:4200/crearCliente") {
        this._clienteService.createClient(client).then(() => {

        }, error => {
          console.log(error)
        })

      }
      else {

        if (this.id !== null) {
          this.hayCliente = true
          this.hideSaldo = true
          if (this.calcularSaldo(client.costo, client.productoActual) >=0) {
            client.saldo=this.calcularSaldo(client.costo, client.productoActual)
            this._clienteService.updateClient(this.id, client).then(data => {
              this.listClientes = data
              
                this._snackBar.open('El pago fue agregado exitosamente!', '', {
                  duration: 1500,
                  horizontalPosition: 'center',
                })
            }, error => {
              console.log(error)

            })
          }
          else {
            this.modalSaldo = true
          }
        }
      }
    }
  }

  deletePago() {
    {
      this.showConfirmationDialog = false
      this.hideSaldo = false
      const client: Cliente = {
        nombre: this.form.get('nombre')?.value,
        apellido: this.form.get('apellido')?.value,
        ciudad: this.form.get('ciudad')?.value,
        tipoLicencia: this.form.get('tipoLicencia')?.value,
        nroSerie: this.form.get('nroSerie')?.value,
        password: this.form.get('password')?.value,
        fechaLicencia: this.form.get('fechaLicencia')?.value,
        observaciones: this.form.get('observaciones')?.value,
        saldo: this.form.get('costo')?.value,
        costo: this.form.get('costo')?.value,
        productoActual: this.listPagos
      }
      if(this.prueba.href="https://sistema-texurnet.web.app/clientes"){
      // if (this.prueba.href == "http://localhost:4200/crearCliente") {
        this._clienteService.createClient(client).then(() => {

        }, error => {
          console.log(error)
        })

      }
      else {

        if (this.id !== null) {
          this.hayCliente = true
          this.hideSaldo = true
          if (this.calcularSaldo(client.costo, client.productoActual) >=0) {
            client.saldo=this.calcularSaldo(client.costo, client.productoActual)
            this._clienteService.updateClient(this.id, client).then(data => {
              this.listClientes = data
              
                this._snackBar.open('El pago fue agregado exitosamente!', '', {
                  duration: 1500,
                  horizontalPosition: 'center',
                })
            }, error => {
              console.log(error)

            })
          }
          else {
            this.modalSaldo = true
          }
        }
      }
    }
  }

calcularSaldo(costo, pagos): number{
  let resultado = costo
  for (let i=0; i < pagos.length; i++){
    resultado = resultado - pagos[i].equivalencia;
  }
  return resultado
}

  editarCliente(){
    if (this.id !== null) {
      this.hayCliente = true
      this.hideSaldo=true
      this.saldoBloq=true
      this.titulo = 'Datos Cliente'
      this._clienteService.getClientsById(this.id).subscribe(data => {
        this.form.setValue({
          nombre: data.nombre,
          apellido: data.apellido,
          ciudad: data.ciudad,
          tipoLicencia: data.tipoLicencia,
          nroSerie: data.nroSerie,
          password: data.password,
          fechaLicencia:data.fechaLicencia.toDate(),
          observaciones: data.observaciones,
          costo: data.costo,
          saldo: this.calcularSaldo(data.costo, data.productoActual)
        })
        this.listPagos= data.productoActual
        this.dataSource = new MatTableDataSource(this.listPagos)
      })
    }
  }

  agregarPago(){
   

    let valorDolar = this.formPago.get('montoDolar')?.value
    let valorPesos = this.formPago.get('montoPesos')?.value
    let valorCotizacion = this.formPago.get('cotizacionActual')?.value
    let valorTipoMoneda = this.formPago.get('tipoMoneda')?.value

    if ((valorTipoMoneda == 'Dolar') && (valorDolar == null||valorDolar ===0)){
      this.montoIncorrecto = true;
    }else{
      if((valorTipoMoneda == 'Pesos') && (valorPesos == null || valorCotizacion == null ||valorPesos ===0 || valorCotizacion === 0)){
        this.montoIncorrecto = true;
      }else{
        let elMonto 
        let laCotizacion 
        let equivalencia
        
        if(valorTipoMoneda == 'Dolar'){
          elMonto = valorDolar
          laCotizacion = '-';
          equivalencia=elMonto 
        }
        else {
          elMonto = valorPesos
          laCotizacion = valorCotizacion
          equivalencia=Math.round(elMonto/laCotizacion)
        }
    
        const miPago: Pago = {
          moneda: valorTipoMoneda,
          monto: elMonto,
          cotizacion: laCotizacion,
          equivalencia:equivalencia,
          fecha: new Date,
          observacion: this.formPago.get('observacion')?.value,
        }
        this.listPagos.push(miPago)  
        
        this.createPago()
    
        this.formPago.reset()
        this.cargaPago = false
        
      }
    }


  }

  showModalPago(){
    this.cargaPago= true;
  }

  closeModalPago(){
    this.cargaPago= false;
    this.formPago.reset()
  }

  formatoFecha(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }

  mostrartab(){
    if(this.prueba.href="https://sistema-texurnet.web.app/clientes"){
    // if(this.prueba.href=="http://localhost:4200/crearCliente"){
    this.ocultarMatTab=false
    }
    else{
      this.ocultarMatTab=true
    }
  }

  aceptar() {
    // Lógica para cancelar la acción
    this.modalSaldo = false;
    this.montoIncorrecto = false;
  }

  // actualizarConversion(valorSeleccionado) {
  //   console.log(valorSeleccionado)
  //   this.conversion = ("Dolar" === valorSeleccionado);
  //   console.log(this.conversion)
  // }


  eliminarPagos(element){
    let resuelve = 0;
    for(let j =0; j < this.listPagos.length; j++){
      if(this.listPagos[j].monto == element.monto){
        resuelve = j;
        j = this.listPagos.length
      }
    }
    this.listPagos.splice(resuelve, 1)
    this.dataSource = new MatTableDataSource(this.listPagos)
    this.deletePago()
     
    
  }
} 





