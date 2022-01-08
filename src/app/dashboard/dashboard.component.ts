import { Component, OnInit } from '@angular/core';
import { ApplicationService, ApplicationSubjectDataModel } from '../services/application/application.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  private _applicationService: ApplicationService;

  wishListTotalApplications: number = 0;
  appliedTotalApplications: number = 0;
  interviewTotalApplications: number = 0;
  offeredTotalApplications: number = 0;
  rejectedTotalApplications: number = 0;

  constructor(applicationService: ApplicationService) {
    this._applicationService = applicationService;
  }

  ngOnInit(): void {
    this.getDashboardData();

    this._applicationService.Subject.subscribe(() => {
      this.getDashboardData();
    });
  }

  getDashboardData() {
    this._applicationService.GetDashboardData().subscribe((data) => {
      this.wishListTotalApplications = data.data.wishlist.totalApplications;
      this.appliedTotalApplications = data.data.applied.totalApplications;
      this.interviewTotalApplications = data.data.interview.totalApplications;
      this.offeredTotalApplications = data.data.offer.totalApplications;
      this.rejectedTotalApplications = data.data.rejected.totalApplications;

      this._applicationService.ApplicationListSubject.next(new ApplicationSubjectDataModel("WishList", data.data.wishlist.applications, data.data.wishlist.totalApplications));
      this._applicationService.ApplicationListSubject.next(new ApplicationSubjectDataModel("Applied", data.data.applied.applications, data.data.applied.totalApplications));
      this._applicationService.ApplicationListSubject.next(new ApplicationSubjectDataModel("Interview", data.data.interview.applications, data.data.interview.totalApplications));
      this._applicationService.ApplicationListSubject.next(new ApplicationSubjectDataModel("Offered", data.data.offer.applications, data.data.offer.totalApplications));
      this._applicationService.ApplicationListSubject.next(new ApplicationSubjectDataModel("Rejected", data.data.rejected.applications, data.data.rejected.totalApplications));
    })
  }
}
