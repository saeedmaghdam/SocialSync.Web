import { HttpClient } from '@angular/common/http';
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

  Login(username: string, password: string) {
    let url = `${this._controllerPath}/login`;

    return this._http.post<LoginResponseModel>(url, {
      username: username,
      password: password
    });
  }

  Logout() {
    let url = `${this._controllerPath}/logout`;

    return this._http.post<LoginResponseModel>(url, { });
  }

  GetToken() {
    if (!this.IsAuthenticated())
      this._router.navigate(['/login']);

    let session = localStorage.getItem('session');
    let sessionModel: SessionResponseModel = JSON.parse(session!);
    if (sessionModel == null || sessionModel == undefined)
      return null;

    return sessionModel.token;
  }
}
