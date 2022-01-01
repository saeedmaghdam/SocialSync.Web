import { BaseModel } from "src/app/models/base-model";
import { ApplicationViewModel } from "./application-view-model";

export class DashboardDataViewModel extends BaseModel {
  data!: DashboardDataViewModelData;
}

export class DashboardDataItemViewModel {
  applications!: ApplicationViewModel[];
  totalApplications!: number;
}

export class DashboardDataViewModelData {
  wishlist!: DashboardDataItemViewModel;
  applied!: DashboardDataItemViewModel;
  interview!: DashboardDataItemViewModel;
  offer!: DashboardDataItemViewModel;
  rejected!: DashboardDataItemViewModel;
}
