import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../constants/role.enum';
import { State } from '../constants/state.enum';
import { ApplicationService } from '../services/application/application.service';
import { FullCreateCompanyRequestModel, FullCreateEmployeeRequestModel, FullCreateRequestModel } from '../services/application/models/full-create-request-model';
import { FullUpdateCompanyRequestModel, FullUpdateEmployeeRequestModel, FullUpdateRequestModel } from '../services/application/models/full-update-request-model';
import { ApplicationViewModel } from '../services/application/view-models/application-view-model';
import { ObjectService } from '../services/object/object.service';
import { SharedService } from '../services/shared/shared.service';

@Component({
  selector: 'create-update-app-app',
  templateUrl: './create-update-app.component.html',
  styleUrls: ['./create-update-app.component.sass']
})
export class CreateUpdateAppComponent implements OnInit {
  private _applicationService: ApplicationService;
  private _sharedService: SharedService;
  private _router: Router;
  private _route: ActivatedRoute;
  private _objectService: ObjectService;

  _loading = false;
  _updateMode = false;

  companyFormGroup: FormGroup;
  employeesFormGroup: FormGroup;
  applicationFormGroup: FormGroup;

  resumeId!: string;
  coverLetterId!: string;

  roleEnum = Role;
  stateEnum = State;
  stateDefaultValue = 1;

  constructor(private formBuilder: FormBuilder, applicationService: ApplicationService, sharedService: SharedService, router: Router, route: ActivatedRoute, objectService: ObjectService) {
    this._applicationService = applicationService;
    this._sharedService = sharedService;
    this._router = router;
    this._route = route;
    this._objectService = objectService;

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
      applySource: ['', []],
      salary: ['', []],
      resumeId: ['', []],
      coverLetterId: ['', []],
      stateId: ['', [Validators.required]],
      toDo: formBuilder.array([]),
      notes: ['', []]
    });

    let id = this._route.snapshot.paramMap.get("id");
    if (id != undefined && id != null)
      this._updateMode = true;
  }

  ngOnInit(): void {
    if (this._updateMode) {
      this.companyFormGroup.get("name")?.disable();
      this.companyFormGroup.get("url")?.disable();
      this.companyFormGroup.get("address")?.disable();
      this.applicationFormGroup.get("jobTitle")?.disable();
      this.applicationFormGroup.get("stateId")?.disable();
      this.applicationFormGroup.get("toDo")?.disable();
      this.applicationFormGroup.get("notes")?.disable();

      let id = this._route.snapshot.paramMap.get("id");
      this._applicationService.GetById(id!).subscribe((data: any) => {
        let application = data.data as ApplicationViewModel;

        this.companyFormGroup.patchValue(
          {
            "name": application.company.name,
            "url": application.company.url,
            "address": application.company.address,
          }
        );

        this.applicationFormGroup.patchValue(
          {
            jobTitle: application.jobTitle,
            applySource: application.applySource,
            salary: application.salary,
            resumeId: application.resumeId,
            coverLetterId: application.coverLetterId,
            stateId: application.stateId.toString(),
            notes: application.notes
          }
        );

        this.stateDefaultValue = application.stateId;

        if (application.company.emails != undefined && application.company.emails != null) {
          for (let email of application.company.emails)
            this.addCompanyEmail(email);
        }

        if (application.company.phoneNumbers != undefined && application.company.phoneNumbers != null) {
          for (let phoneNumber of application.company.phoneNumbers)
            this.addCompanyPhoneNumbers(phoneNumber);
        }

        if (application.employees != undefined && application.employees != null) {
          for (let employee of application.employees)
            this.addEmployee(employee.name, employee.roleId, employee.phoneNumber, employee.email, employee.profileUrl, employee.pictureId);
        }

        if (application.toDo != undefined && application.toDo != null) {
          for (let toDo of application.toDo)
            this.addToDo(toDo.title);
        }
      });
    }
  }

  SubmitCreateForm() {
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
    for (let item of this.applicationFormGroup.value.toDo)
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

  SubmitUpdateForm() {
    let id = this._route.snapshot.paramMap.get("id");

    let emailAddresses: Array<string> = new Array<string>()

    for (let email of this.getEmailsArray().controls) {
      emailAddresses.push(email.value.email);
    }

    let phoneNumbers: Array<string> = new Array<string>()
    for (let phoneNumber of this.getPhoneNumbersArray().controls) {
      phoneNumbers.push(phoneNumber.value.phoneNumber);
    }

    let companyModel: FullUpdateCompanyRequestModel = {
      Emails: emailAddresses,
      PhoneNumbers: phoneNumbers
    };

    let employees = new Array<FullUpdateEmployeeRequestModel>();
    for (let employee of this.getEmployeesArray().controls) {
      let newEmployee: FullUpdateEmployeeRequestModel = {
        Email: employee.value.email,
        Name: employee.value.name,
        PhoneNumber: employee.value.phoneNumber,
        PictureId: employee.value.pictureId,
        ProfileUrl: employee.value.profileUrl,
        RoleId: employee.value.roleId
      }

      employees.push(newEmployee);
    }

    let model: FullUpdateRequestModel = {
      Id: id!,
      ApplySource: this.applicationFormGroup.value.applySource,
      Salary: this.applicationFormGroup.value.salary,
      CoverLetterId: this.applicationFormGroup.value.coverLetterId,
      ResumeId: this.applicationFormGroup.value.resumeId,
      Company: companyModel,
      Employees: employees
    };

    if (this.companyFormGroup.valid && this.employeesFormGroup.valid && this.applicationFormGroup.valid) {
      this._applicationService.FullUpdate(model).subscribe((data) => {
        this._sharedService.toastSuccess("Application updated successfully.");
        this._router.navigate(["/dashboard"]);
      });
    }
  }

  //#region Shared methods
  addCompanyEmail(email: string = "") {
    const control = this.formBuilder.group({
      email: [email, [Validators.email]]
    });

    this.getEmailsArray().push(control);
  }

  getEmailsArray(): FormArray {
    return this.companyFormGroup.get('emails') as FormArray;
  }

  addCompanyPhoneNumbers(phoneNumber: string = "") {
    const control = this.formBuilder.group({
      phoneNumber: [phoneNumber]
    });

    this.getPhoneNumbersArray().push(control);
  }

  getPhoneNumbersArray(): FormArray {
    return this.companyFormGroup.get('phoneNumbers') as FormArray;
  }

  addEmployee(name: string = "", roleId: number = 0, phoneNumber: string = "", email: string = "", profileUrl: string = "", pictureId: string = "") {
    const control = this.formBuilder.group({
      name: [name, [Validators.required]],
      roleId: [roleId.toString()],
      phoneNumber: [phoneNumber],
      email: [email],
      profileUrl: [profileUrl],
      pictureId: [pictureId]
    });

    this.getEmployeesArray().push(control);
  }

  getEmployeesArray(): FormArray {
    return this.employeesFormGroup.get('employees') as FormArray;
  }

  addToDo(task: string = "") {
    const control = this.formBuilder.group({
      toDo: [task]
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

  DownloadEmployeePicture(objectId: string) {
    if (objectId == undefined || objectId == null)
      return;

    this._objectService.DownloadImage(objectId);
  }

  Download(objectId: string) {
    if (objectId == undefined || objectId == null)
      return;

    this._objectService.Download(objectId);
  }
  //#endregion
}
