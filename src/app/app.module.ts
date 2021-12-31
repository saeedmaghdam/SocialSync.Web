import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatSidenavModule } from '@angular/material/sidenav'

import { LoginComponent } from './login/login.component'
import { AppGuard } from './app-guard.guard';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggedInAppGuard } from './logged-in-app-guard.guard';
import { AuthInterceptor } from './auth.interceptor';

import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,

    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,

    CommonModule,
    ToastrModule.forRoot()
  ],
  providers: [AppGuard, LoggedInAppGuard,
    {
    provide : HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi   : true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
