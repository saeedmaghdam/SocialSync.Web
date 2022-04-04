import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators'
import { ApiPath } from 'src/app/apiPath';
import { environment } from '../../../environments/environment';
import { SharedService } from '../shared/shared.service';
 


@Injectable({
  providedIn: 'root'
})
export class TasksService implements OnInit {
  private _http: HttpClient;
  private _router: Router;
  private _sharedService: SharedService;

  private _controllerPath: string = `${environment.baseUrl}${ApiPath.Catalog}`;

  constructor(http: HttpClient, router: Router, sharedService: SharedService) {
    this._http = http;
    this._router = router;
    this._sharedService = sharedService;
  }

  ngOnInit(): void {

  }
 
  TasksList(sourceType: number, sourceId: string ) {
    debugger
    let url = `${this._controllerPath}/task?sourceType=${sourceType}&sourceId=${sourceId}`;

    return this._http.get(url, {} ).pipe(tap(data => data));
    }
}
