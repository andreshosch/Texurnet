import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  loading = false

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router, private _translateService: TranslateService) {

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
      this._snackBar.open(this._translateService.instant('LOGIN_ERROR'), '', {
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





