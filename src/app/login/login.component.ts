import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../services/account/account.service';
import { LoginModel } from '../services/models/login-model';
import { SessionModel } from '../services/models/session-model';
import { SharedService } from '../services/shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  _accountService: AccountService;
  _router: Router;
  _sharedService: SharedService;

  errorMessage!: string;

  usernameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  constructor(accountService: AccountService, router: Router, sharedService: SharedService) {
    this._accountService = accountService;
    this._router = router;
    this._sharedService = sharedService;
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
    }, (data) => {
      this._sharedService.toastError(data.error.error.error_description);
      // this._sharedService.OpenSnackBar(this.errorMessage = data.error.error.error_description, 'close')
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
