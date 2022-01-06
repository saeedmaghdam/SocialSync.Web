import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiPath } from 'src/app/apiPath';
import { environment } from 'src/environments/environment';
import { FullCreateRequestModel } from './models/full-create-request-model';
import { FullUpdateRequestModel } from './models/full-update-request-model';
import { ApplicationViewModel } from './view-models/application-view-model';
import { DashboardDataViewModel } from './view-models/dashboard-data-view-model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  Subject: Subject<boolean>;
  SearchSubject: Subject<string>;

  private _http: HttpClient;

  private _controllerPath: string = `${environment.baseUrl}${ApiPath.Application}`;

  constructor(http: HttpClient) {
    this._http = http;

    this.Subject = new Subject<boolean>();
    this.SearchSubject = new Subject<string>();
  }

  GetById(id: string) {
    let url = `${this._controllerPath}/${id}`;

    return this._http.get<ApplicationViewModel>(url);
  }

  GetDashboardData() {
    let url = `${this._controllerPath}/dashboardData`;

    return this._http.get<DashboardDataViewModel>(url);
  }

  FullCreate(model: FullCreateRequestModel) {
    let url = `${this._controllerPath}/fullCreate`;

    return this._http.post(url, model);
  }

  FullUpdate(model: FullUpdateRequestModel) {
    let url = `${this._controllerPath}/fullUpdate`;

    return this._http.post(url, model);
  }

  PatchNotes(id: string, notes: string) {
    let url = `${this._controllerPath}/${id}/notes`;

    return this._http.patch(url, {
      notes: notes
    });
  }

  PatchToDoStatus(id: string, toDoIds: string[]) {
    let url = `${this._controllerPath}/${id}/toDoStatus`;

    return this._http.patch(url, {
      toDoIds: toDoIds
    });
  }

  CreateAndPatchToDo(id: string, title: string, toDoIds: string[]) {
    let url = `${this._controllerPath}/${id}/createAndPatchToDo`;

    return this._http.post(url, {
      title: title,
      toDoIds: toDoIds
    });
  }

  PatchState(id: string, stateId: number, logMessage: string) {
    let url = `${this._controllerPath}/${id}/state`;

    return this._http.patch(url, {
      stateId: stateId,
      logMessage: logMessage
    });
  }

  Delete(id: string) {
    let url = `${this._controllerPath}/${id}`;

    return this._http.delete(url, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    });
  }
}
