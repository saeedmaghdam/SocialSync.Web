import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account/account.service';
import { ApplicationService } from '../services/application/application.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
  _accountService: AccountService;
  _router: Router;
  _applicationService: ApplicationService;

  searchKeyword!: string;

  constructor(accountService: AccountService, router: Router, applicationService: ApplicationService) {
    this._accountService = accountService;
    this._router = router;
    this._applicationService = applicationService;
   }

  ngOnInit(): void {
  }

  Logout() {
    this._accountService.Logout().subscribe(() => {
      localStorage.removeItem('session');
      this._router.navigate(['/login']);
    })
  }

  Search() {
    this._applicationService.SearchSubject.next(this.searchKeyword.toLowerCase());
  }
}
