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

import { NgxMatDatetimePickerModule, NgxMatDateAdapter, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';

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
import { CreateUpdateAppComponent } from './create-update-app/create-update-app.component';
import { EnumToArrayPipe } from './pipes/EnumToArrayPipe';
import { UploadComponent } from './upload/upload.component';
import { ApplicationListComponent } from './application-list/application-list.component';
import { DateDiffPipe } from './pipes/DateDiffPipe';
import { TodoDialogComponent } from './dialogs/todo-dialog/todo-dialog.component';
import { NoteDialogComponent } from './dialogs/note-dialog/note-dialog.component';
import { StateDialogComponent } from './dialogs/state-dialog/state-dialog.component';
import { LogMessageDialogComponent } from './dialogs/log-message-dialog/log-message-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ApplicationService } from './services/application/application.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    DashboardComponent,
    CreateUpdateAppComponent,
    EnumToArrayPipe,
    DateDiffPipe,
    UploadComponent,
    ApplicationListComponent,
    NoteDialogComponent,
    TodoDialogComponent,
    StateDialogComponent,
    LogMessageDialogComponent,
    ConfirmDialogComponent,
    RegisterComponent,
    ResetPasswordComponent
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
    },
    ApplicationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
