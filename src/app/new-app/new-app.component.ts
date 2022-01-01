import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { Role } from '../constants/role.enum';
import { State } from '../constants/state.enum';
import { ApplicationService } from '../services/application/application.service';
import { FullCreateCompanyRequestModel, FullCreateEmployeeRequestModel, FullCreateRequestModel } from '../services/application/models/full-create-request-model';
import { SharedService } from '../services/shared/shared.service';

@Component({
  selector: 'app-new-app',
  templateUrl: './new-app.component.html',
  styleUrls: ['./new-app.component.sass']
})
export class NewAppComponent implements OnInit {
  private _applicationService: ApplicationService;
  private _sharedService: SharedService;
  private _router: Router;

  _loading = false;

  companyFormGroup: FormGroup;
  employeesFormGroup: FormGroup;
  applicationFormGroup: FormGroup;

  resumeId!: string;
  coverLetterId!: string;

  roleEnum = Role;
  stateEnum = State;

  constructor(private formBuilder: FormBuilder, applicationService: ApplicationService, sharedService: SharedService, router: Router) {
    this._applicationService = applicationService;
    this._sharedService = sharedService;
    this._router = router;

    this.companyFormGroup = formBuilder.group({
      name: ['', [Validators.required]],
      url: ['', [Validators.required]],
      emails: formBuilder.array([]),
      phoneNumbers: formBuilder.array([]),
      address: ['']
    });

    this.employeesFormGroup = formBuilder.group({
      employees: formBuilder.array([])
    });

    this.applicationFormGroup = formBuilder.group({
      jobTitle: ['', [Validators.required]],
      applySource: ['', [Validators.required]],
      salary: ['', []],
      resumeId: ['', [Validators.required]],
      coverLetterId: ['', [Validators.required]],
      stateId: ['', [Validators.required]],
      toDo: formBuilder.array([]),
      notes: ['', []]
    });
  }

  ngOnInit(): void {
  }

  addCompanyEmail() {
    const control = this.formBuilder.group({
      email: ['', [Validators.email]]
    });

    this.getEmailsArray().push(control);
  }

  getEmailsArray(): FormArray {
    return this.companyFormGroup.get('emails') as FormArray;
  }

  addCompanyPhoneNumbers() {
    const control = this.formBuilder.group({
      phoneNumber: ['']
    });

    this.getPhoneNumbersArray().push(control);
  }

  getPhoneNumbersArray(): FormArray {
    return this.companyFormGroup.get('phoneNumbers') as FormArray;
  }

  addEmployee() {
    const control = this.formBuilder.group({
      name: ['', [Validators.required]],
      roleId: [''],
      phoneNumber: [''],
      email: [''],
      profileUrl: [''],
      pictureId: ['']
    });

    this.getEmployeesArray().push(control);
  }

  getEmployeesArray(): FormArray {
    return this.employeesFormGroup.get('employees') as FormArray;
  }

  addToDo() {
    const control = this.formBuilder.group({
      toDo: ['']
    });

    this.getToDoArray().push(control);
  }

  getToDoArray(): FormArray {
    return this.applicationFormGroup.get('toDo') as FormArray;
  }

  deleteEmail(index: number) {
    this.getEmailsArray().removeAt(index);
  }

  deletePhoneNumber(index: number) {
    this.getPhoneNumbersArray().removeAt(index);
  }

  deleteEmployee(index: number) {
    this.getEmployeesArray().removeAt(index);
  }

  deleteToDo(index: number) {
    this.getToDoArray().removeAt(index);
  }

  submit() {
    let emailAddresses: Array<string> = new Array<string>()

    for (let email of this.getEmailsArray().controls) {
      emailAddresses.push(email.value.email);
    }

    let phoneNumbers: Array<string> = new Array<string>()
    for (let phoneNumber of this.getPhoneNumbersArray().controls) {
      phoneNumbers.push(phoneNumber.value.phoneNumber);
    }

    let companyModel: FullCreateCompanyRequestModel = {
      Address: this.companyFormGroup.value.address,
      Name: this.companyFormGroup.value.name,
      Url: this.companyFormGroup.value.url,
      Emails: emailAddresses,
      PhoneNumbers: phoneNumbers
    };

    let employees = new Array<FullCreateEmployeeRequestModel>();
    for (let employee of this.getEmployeesArray().controls) {
      let newEmployee: FullCreateEmployeeRequestModel = {
        Email: employee.value.email,
        Name: employee.value.name,
        PhoneNumber: employee.value.phoneNumber,
        PictureId: employee.value.pictureId,
        ProfileUrl: employee.value.profileUrl,
        RoleId: employee.value.roleId
      }

      employees.push(newEmployee);
    }

    let toDoArray = [];
    for(let item of this.applicationFormGroup.value.toDo)
      toDoArray.push(item.toDo);

    let model: FullCreateRequestModel = {
      JobTitle: this.applicationFormGroup.value.jobTitle,
      ApplySource: this.applicationFormGroup.value.applySource,
      Salary: this.applicationFormGroup.value.salary,
      CoverLetterId: this.applicationFormGroup.value.coverLetterId,
      ResumeId: this.applicationFormGroup.value.resumeId,
      Company: companyModel,
      Employees: employees,
      StateId: this.applicationFormGroup.value.stateId,
      Notes: this.applicationFormGroup.value.notes,
      ToDo: toDoArray
    };

    if (this.companyFormGroup.valid && this.employeesFormGroup.valid && this.applicationFormGroup.valid) {
      this._applicationService.FullCreate(model).subscribe((data) => {
        this._sharedService.toastSuccess("Application submitted successfully.");
        this._router.navigate(["/dashboard"]);
      });
    }
  }

  public uploadEmployeePicture = (event: any, index: number) => {
    if (event.error != null || event.error != undefined)
      return;

    this.getEmployeesArray().controls[index].patchValue({
      pictureId: event.data
    })
  }

  public uploadResume = (event: any) => {
    if (event.error != null || event.error != undefined)
      return;

    this.applicationFormGroup.patchValue({
      resumeId: event.data
    });
  }

  public uploadCoverLetter = (event: any) => {
    if (event.error != null || event.error != undefined)
      return;

    this.applicationFormGroup.patchValue({
      coverLetterId: event.data
    });
  }
}
