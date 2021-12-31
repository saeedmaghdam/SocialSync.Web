import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../services/account/account.service';
import { LoginResponseModel } from '../services/account/models/login-response-model';
import { SessionResponseModel } from '../services/account/models/session-response-model';
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

  _loading = false;

  errorMessage!: string;

  usernameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);

  constructor(accountService: AccountService, router: Router, sharedService: SharedService) {
    this._accountService = accountService;
    this._router = router;
    this._sharedService = sharedService;
  }

  ngOnInit(): void {
  }

  login() {
    this._loading = true;

    this._accountService.Login(this.usernameFormControl.value, this.passwordFormControl.value).subscribe((data) => {
      let model: LoginResponseModel = data;
      let session: SessionResponseModel = {
        expirationDate: model.data.expirationDate,
        token: model.data.token
      }

      localStorage.setItem('session', JSON.stringify(session));

      this._router.navigate(['/dashboard']);
    }, (data) => {
      this._loading = false;

      this._sharedService.toastError(data.error.error.error_description);
      // this._sharedService.OpenSnackBar(this.errorMessage = data.error.error.error_description, 'close')
    })
  }
}
