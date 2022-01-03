import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppGuard } from './app-guard.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LoggedInAppGuard } from './logged-in-app-guard.guard';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { CreateUpdateAppComponent } from './create-update-app/create-update-app.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoggedInAppGuard], pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, canActivate: [LoggedInAppGuard], pathMatch: 'full' },
  { path: 'resetPassword', component: ResetPasswordComponent, canActivate: [LoggedInAppGuard], pathMatch: 'full' },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '', component: MainComponent, canActivateChild: [AppGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, pathMatch: 'full' },
      { path: 'dashboard/app/create', component: CreateUpdateAppComponent, pathMatch: 'full' },
      { path: 'dashboard/app/update/:id', component: CreateUpdateAppComponent, pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
