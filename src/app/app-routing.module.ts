import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppGuard } from './app-guard.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoggedInAppGuard } from './logged-in-app-guard.guard';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { NewAppComponent } from './new-app/new-app.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoggedInAppGuard] },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '', component: MainComponent, canActivateChild: [AppGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, pathMatch: 'full' },
      { path: 'dashboard/app/new', component: NewAppComponent, pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
