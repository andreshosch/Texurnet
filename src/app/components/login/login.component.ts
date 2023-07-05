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
  loading = false

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router) {

    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    })

  }

  ingresar() {

    const usuario = this.form.value.usuario;
    const password = this.form.value.password;
    if ((usuario == "txtadmin01" && password == "txt01admin")||(usuario == "txtadmin02" && password == "txt02admin")||(usuario == "txtadmin03" && password == "txt03admin")) {
      this.fakeLoggin();
    } else if (usuario == "txtinvitado" && password == "invitadotxt") {
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
    this.loading = true
    setTimeout(() => {
      this.router.navigate(['home'])
    }, 1500);
  }

  loginInvitado(){
    this.loading = true
    setTimeout(() => {
      this.router.navigate(['invitado'])
    }, 1500);
  }

}


