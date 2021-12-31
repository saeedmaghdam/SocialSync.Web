import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account/account.service';
import { LoginModel } from '../services/models/login-model';
import { SessionModel } from '../services/models/session-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  _accountService: AccountService;
  _router: Router;

  usernameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  constructor(accountService: AccountService, router: Router) {
    this._accountService = accountService;
    this._router = router;
  }

  ngOnInit(): void {
  }

  login() {
    this._accountService.Login(this.usernameFormControl.value, this.passwordFormControl.value).subscribe((data) => {
      let model: LoginModel = data;
      let session: SessionModel = {
        expirationDate: model.data.expirationDate,
        token: model.data.token
      }

      localStorage.setItem('session', JSON.stringify(session));

      this._router.navigate(['/dashboard']);
    })
  }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
