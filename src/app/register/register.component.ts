import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { AccountService } from '../services/account/account.service';
import { SharedService } from '../services/shared/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  private _accountService: AccountService;
  private _sharedService: SharedService;
  private _router: Router;

  _loading!: boolean;
  _stepNumber: number = 0;

  registrationFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, accountService: AccountService, sharedService: SharedService, router: Router, private recaptchaV3Service: ReCaptchaV3Service) {
    this._accountService = accountService;
    this._sharedService = sharedService;
    this._router = router;

    this.registrationFormGroup = formBuilder.group({
      mobileNumber: ['', [Validators.required]],
      verificationCode: ['', [Validators.required]],
      password: ['', [Validators.required]],
      name: ['', [Validators.required]],
      family: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  SendVerificationCode() {
    debugger
    if (!this.registrationFormGroup.get("mobileNumber")?.valid)
      return

    this.recaptchaV3Service.execute('importantAction')
      .subscribe((token: string) => {
        this._accountService.RegisterVerificationCode(this.registrationFormGroup.get("mobileNumber")?.value, token).subscribe(() => {
          this._stepNumber++;
          this.registrationFormGroup.get("mobileNumber")?.disable();
        }, (error) => {
          this._sharedService.toastError(error.error.error.error_description);
        });
      });
  }

  Submit() {
    if (!this.registrationFormGroup.valid)
      return

    this.recaptchaV3Service.execute('importantAction')
      .subscribe((token: string) => {
        this._accountService.Register(
          this.registrationFormGroup.get("mobileNumber")?.value,
          this.registrationFormGroup.get("password")?.value,
          this.registrationFormGroup.get("name")?.value,
          this.registrationFormGroup.get("family")?.value,
          this.registrationFormGroup.get("verificationCode")?.value,
          token
        ).subscribe(() => {
          this._sharedService.toastSuccess("Account created successfully.");
          this._router.navigate(["/login"]);
        }, (error) => {
          this._sharedService.toastError(error.error.error.error_description);
        });
      });
  }
}
