import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPath } from 'src/app/apiPath';
import { environment } from '../../../environments/environment';
import { LoginResponseModel } from './models/login-response-model';
import { SessionResponseModel } from './models/session-response-model';


@Injectable({
  providedIn: 'root'
})
export class AccountService implements OnInit {
  private _http: HttpClient;
  private _router: Router;

  private _controllerPath: string = `${environment.baseUrl}${ApiPath.Account}`;

  constructor(http: HttpClient, router: Router) {
    this._http = http;
    this._router = router;
  }

  ngOnInit(): void {

  }

  IsAuthenticated() {
    let session = localStorage.getItem('session');
    if (session == null || session == undefined)
      return false;

    let sessionModel: SessionResponseModel = JSON.parse(session);
    if (sessionModel == null || sessionModel == undefined)
      return false;

    if (sessionModel.token == null || sessionModel.token == undefined)
      return false;

    if (new Date() > sessionModel.expirationDate)
      return false;

    return true;
  }

  Login(username: string, password: string, token: string) {
    let url = `${this._controllerPath}/login`;

    return this._http.post<LoginResponseModel>(url, {
      username: username,
      password: password
    }, {
      headers: new HttpHeaders({ 'RecaptchaToken': token })
    });
  }

  Logout() {
    let url = `${this._controllerPath}/logout`;

    return this._http.post<LoginResponseModel>(url, {});
  }

  GetToken() {
    if (!this.IsAuthenticated()) {
      if (this._router.url != "/login" && this._router.url != "/register" && this._router.url != "/resetPassword")
        this._router.navigate(['/login']);
    }

    let session = localStorage.getItem('session');
    let sessionModel: SessionResponseModel = JSON.parse(session!);
    if (sessionModel == null || sessionModel == undefined)
      return null;

    return sessionModel.token;
  }

  RegisterVerificationCode(mobileNumber: string) {
    let url = `${this._controllerPath}/registerVerificationCode`;

    return this._http.post(url, {
      mobileNumber: mobileNumber
    });
  }

  ResetPasswordVerificationCode(mobileNumber: string) {
    let url = `${this._controllerPath}/resetPasswordVerificationCode`;

    return this._http.post<LoginResponseModel>(url, {
      mobileNumber: mobileNumber
    });
  }

  Register(mobileNumber: string, password: string, name: string, family: string, verificationCode: string) {
    let url = `${this._controllerPath}/register`;

    return this._http.post(url, {
      mobileNumber: mobileNumber,
      password: password,
      name: name,
      family: family,
      verificationCode: verificationCode
    });
  }

  ResetPassword(mobileNumber: string, password: string, verificationCode: string) {
    let url = `${this._controllerPath}/resetPassword`;

    return this._http.post(url, {
      mobileNumber: mobileNumber,
      password: password,
      verificationCode: verificationCode
    });
  }
}
