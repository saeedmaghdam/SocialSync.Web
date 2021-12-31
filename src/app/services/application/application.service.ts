import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPath } from 'src/app/apiPath';
import { environment } from 'src/environments/environment';
import { FullCreateRequestModel } from './models/full-create-request-model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private _http: HttpClient;

  private _controllerPath: string = `${environment.baseUrl}${ApiPath.Application}`;

  constructor(http: HttpClient) {
    this._http = http;
  }

  FullCreate(model: FullCreateRequestModel) {
    let url = `${this._controllerPath}/fullCreate`

    return this._http.post(url, model);
  }
}
