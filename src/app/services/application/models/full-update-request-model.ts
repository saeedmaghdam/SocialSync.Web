export class FullUpdateRequestModel {
  Id!: string;
  Company!: FullUpdateCompanyRequestModel;
  Employees!: FullUpdateEmployeeRequestModel[];
  ApplySource!: string;
  Salary!: string;
  ResumeId!: string;
  CoverLetterId!: string;
}

export class FullUpdateCompanyRequestModel {
  Emails!: string[];
  PhoneNumbers!: string[];
}

export class FullUpdateEmployeeRequestModel {
  Name!: string;
  RoleId!: string;
  PhoneNumber!: string;
  Email!: string;
  ProfileUrl!: string;
  PictureId!: string;
}
