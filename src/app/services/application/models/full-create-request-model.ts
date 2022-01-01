export class FullCreateRequestModel {
  Company!: FullCreateCompanyRequestModel;
  Employees!: FullCreateEmployeeRequestModel[];
  JobTitle!: string;
  StateId!: number;
  ApplySource!: string;
  Salary!: string;
  ResumeId!: string;
  CoverLetterId!: string;
  ToDo!: string[];
  Notes!: string;
}

export class FullCreateCompanyRequestModel {
  Name!: string;
  Url!: string;
  Emails!: string[];
  PhoneNumbers!: string[];
  Address!: string;
}

export class FullCreateEmployeeRequestModel {
  Name!: string;
  RoleId!: string;
  PhoneNumber!: string;
  Email!: string;
  ProfileUrl!: string;
  PictureId!: string;
}
