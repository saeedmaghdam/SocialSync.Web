import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPath } from 'src/app/apiPath';
import { environment } from 'src/environments/environment';
import { FullCreateRequestModel } from './models/full-create-request-model';
import { DashboardDataViewModel } from './view-models/dashboard-data-view-model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private _http: HttpClient;

  private _controllerPath: string = `${environment.baseUrl}${ApiPath.Application}`;

  constructor(http: HttpClient) {
    this._http = http;
  }

  GetDashboardData() {
    let url = `${this._controllerPath}/dashboardData`;

    return this._http.get<DashboardDataViewModel>(url);
  }

  FullCreate(model: FullCreateRequestModel) {
    let url = `${this._controllerPath}/fullCreate`;

    return this._http.post(url, model);
  }

  PatchNotes(id: string, notes: string){
    let url = `${this._controllerPath}/${id}/notes`;

    return this._http.patch(url, {
      notes: notes
    });
  }
}
