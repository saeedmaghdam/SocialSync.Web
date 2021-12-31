import { BaseModel } from "src/app/models/base-model";

export class LoginModel extends BaseModel {
  data!: LoginModelData;
}

export class LoginModelData {
  token!: string;
  isSuccessful!: boolean;
  expirationDate!: Date;
}
