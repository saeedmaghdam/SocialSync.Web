import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../services/account/account.service';
import { LoginResponseModel } from '../services/account/models/login-response-model';
import { SessionResponseModel } from '../services/account/models/session-response-model';
import { SharedService } from '../services/shared/shared.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  _accountService: AccountService;
  _router: Router;
  _sharedService: SharedService;

  loginFormGroup!: FormGroup;

  _loading = false;

  constructor(private formBuilder: FormBuilder, accountService: AccountService, router: Router, sharedService: SharedService, private recaptchaV3Service: ReCaptchaV3Service) {
    this._accountService = accountService;
    this._router = router;
    this._sharedService = sharedService;

    this.loginFormGroup = formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  Login() {
    this.recaptchaV3Service.execute('importantAction')
      .subscribe((token: string) => {
        this._loading = true;
        console.log(this.loginFormGroup.get("username")?.value);
        this._accountService.Login(this.loginFormGroup.get("username")?.value, this.loginFormGroup.get("password")?.value, token).subscribe((data) => {
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
      });
  }
}
