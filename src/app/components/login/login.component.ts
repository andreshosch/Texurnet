import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  loading:boolean
  

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router) {

    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    })

  }

  ingresar() {

    const usuario = this.form.value.usuario;
    const password = this.form.value.password;
    if ((usuario == "texurnet01" && password == "gestion01")||(usuario == "texurnet02" && password == "gestion02")||(usuario == "texurnet03" && password == "gestion03")) {
      this.fakeLoggin();
    } else if (usuario == "invitado" && password == "invitado01") {
      this.loginInvitado();
    }
    else {
      this.error();
      this.form.reset();
    }
  }
  error() {
    this._snackBar.open('Usuario o Contraseña ingresado son inválidos', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

  fakeLoggin() {
   
    setTimeout(() => {
      this.router.navigate(['home'])
    }, 3000);
  }

  loginInvitado(){
    
    setTimeout(() => {
      this.router.navigate(['invitado'])
    }, 3000);
  }

}


