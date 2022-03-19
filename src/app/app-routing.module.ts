import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppGuard } from './app-guard.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LoggedInAppGuard } from './logged-in-app-guard.guard';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { TasksComponent } from './dashboard/tasks/tasks.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoggedInAppGuard], pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, canActivate: [LoggedInAppGuard], pathMatch: 'full' },
  { path: 'resetPassword', component: ResetPasswordComponent, canActivate: [LoggedInAppGuard], pathMatch: 'full' },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '', component: MainComponent, canActivateChild: [AppGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, pathMatch: 'full' }
    ]
  },
  {
    path: '', component: MainComponent, canActivateChild: [AppGuard],
    children: [
      { path: 'dashboard/Tasks', component: TasksComponent, pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
