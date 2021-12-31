import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account/account.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
  _accountService: AccountService;
  _router: Router;

  constructor(accountService: AccountService, router: Router) {
    this._accountService = accountService;
    this._router = router;
   }

  ngOnInit(): void {
  }

  Logout() {
    this._accountService.Logout().subscribe(() => {
      localStorage.removeItem('session');
      this._router.navigate(['/login']);
    })
  }
}
