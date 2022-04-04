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
import { MatStepperModule } from '@angular/material/stepper'
import { MatSelectModule } from '@angular/material/select'
import { MatCardModule } from '@angular/material/card'
import { MatBadgeModule } from '@angular/material/badge'
import { MatDialogModule } from '@angular/material/dialog'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatTableModule } from '@angular/material/table'
import {MatExpansionModule} from '@angular/material/expansion';

import { NgxMatDatetimePickerModule, NgxMatDateAdapter, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';

import { TasksComponent } from './dashboard/tasks/tasks.component' 

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
import { EnumToArrayPipe } from './pipes/EnumToArrayPipe';
import { UploadComponent } from './upload/upload.component';
import { DateDiffPipe } from './pipes/DateDiffPipe';

import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    DashboardComponent,
    EnumToArrayPipe,
    DateDiffPipe,
    UploadComponent,
    RegisterComponent,
    ResetPasswordComponent,
    TasksComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatStepperModule,
    MatSelectModule,
    MatCardModule,
    MatBadgeModule,
    MatDialogModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatTableModule,
    MatExpansionModule,

    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,

    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,

    CommonModule,
    ToastrModule.forRoot(),

    RecaptchaV3Module
  ],
  exports: [
    EnumToArrayPipe,
    DateDiffPipe
  ],
  providers: [AppGuard, LoggedInAppGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.recaptcha.siteKey,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
