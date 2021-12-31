export class FullCreateRequestModel {
  Company!: FullCreateCompanyRequestModel;
  Employees!: FullCreateEmployeeRequestModel[];
  ApplySource!: string;
  ResumeId!: string;
  CoverLetterId!: string;
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
