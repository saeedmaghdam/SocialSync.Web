import { CompanyViewModel } from "../../company/view-models/company-view-model";
import { EmployeeViewModel } from "../../employee/view-models/employee-view-model";

export class ApplicationViewModel {
  id!: string;
  recordStatus!: number;
  recordInsertDate!: Date;
  recordLastEditDate!: Date;
  jobTitle!: string;
  salary!: string;
  company!: CompanyViewModel;
  employees!: EmployeeViewModel[];
  stateId!: number;
  state!: string;
  applySource!: string;
  resumeId!: string;
  coverLetterId!: string;
  history!: ApplicationHistoryItemViewModel[];
  toDo!: ApplicationToDoItemViewModel[];
  unDoneToDoCount!: number;
  notes!: string;
}

export class ApplicationHistoryItemViewModel {
  id!: string;
  recordInsertDate!: Date;
  logDateTime!: Date;
  description!: string;
}

export class ApplicationToDoItemViewModel {
  id!: string;
  recordInsertDate!: Date;
  title!: string;
  isDone!: boolean;
}
