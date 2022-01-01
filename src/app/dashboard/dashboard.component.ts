import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../services/application/application.service';
import { DashboardDataViewModelData } from '../services/application/view-models/dashboard-data-view-model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  private _applicationService: ApplicationService;

  _dashboardData!: DashboardDataViewModelData;

  constructor(applicationService: ApplicationService) {
    this._applicationService = applicationService;
  }

  ngOnInit(): void {
    this.getDashboardData();
  }

  getDashboardData() {
    this._applicationService.GetDashboardData().subscribe((data) => {
      this._dashboardData = data.data;
    })
  }

  getWishlistApplications() {
    return this._dashboardData?.wishlist.applications;
  }

  getTotalWishlistApplications() {
    return this._dashboardData?.wishlist.totalApplications;
  }

  getAppliedApplications() {
    return this._dashboardData?.applied.applications;
  }

  getTotalAppliedApplications() {
    return this._dashboardData?.applied.totalApplications;
  }

  getInterviewApplications() {
    return this._dashboardData?.interview.applications;
  }

  getTotalInterviewApplications() {
    return this._dashboardData?.interview.totalApplications;
  }

  getOfferApplications() {
    return this._dashboardData?.offer.applications;
  }

  getTotalOfferApplications() {
    return this._dashboardData?.offer.totalApplications;
  }

  getRejectedApplications() {
    return this._dashboardData?.rejected.applications;
  }

  getTotalRejectedApplications() {
    return this._dashboardData?.rejected.totalApplications;
  }

}
