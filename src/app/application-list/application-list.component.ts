import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { LogMessageDialogComponent } from '../log-message-dialog/log-message-dialog.component';
import { NoteDialogComponent } from '../dialogs/note-dialog/note-dialog.component';
import { StateDialogComponent } from '../dialogs/state-dialog/state-dialog.component';
import { TodoDialogComponent } from '../dialogs/todo-dialog/todo-dialog.component';
import { ApplicationService } from '../services/application/application.service';
import { ApplicationHistoryItemViewModel, ApplicationToDoItemViewModel, ApplicationViewModel } from '../services/application/view-models/application-view-model';
import { ObjectService } from '../services/object/object.service';
import { SharedService } from '../services/shared/shared.service';
import { DomSanitizer } from '@angular/platform-browser';

class EmployeeImage {
  ObjectId!: String;
  Image!: Blob;
}

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.sass']
})
export class ApplicationListComponent implements OnInit {
  @Input() applications!: ApplicationViewModel[];
  @Input() totalApplicationsCount!: number;
  @Input() emptyMessage!: string;

  filteredApplications!: ApplicationViewModel[];

  private _objectService: ObjectService;
  private _applicationService: ApplicationService;
  private _sharedService: SharedService;
  private _dialog: MatDialog;

  _images: Array<EmployeeImage> = new Array<EmployeeImage>();

  constructor(objectService: ObjectService, applicationService: ApplicationService, sharedService: SharedService, dialog: MatDialog, private sanitizer: DomSanitizer) {
    this._objectService = objectService;
    this._applicationService = applicationService;
    this._sharedService = sharedService;
    this._dialog = dialog;

    this._applicationService.SearchSubject.subscribe((keyword) => {
      if (keyword.length == 0)
        this.filteredApplications = this.applications;

      this.filteredApplications = this.applications.filter(x =>
        (x.company != undefined && x.company != null && x.company.name != undefined && x.company.name != null && x.company.name.toLowerCase().indexOf(keyword) != -1)
        || (x.company != undefined && x.company != null && x.company.url != undefined && x.company.url != null && x.company.url.toLowerCase().indexOf(keyword) != -1)
        || (x.company != undefined && x.company != null && x.company.emails != undefined && x.company.emails != null && x.company.emails.filter(z => z != undefined && z != null && z.toLowerCase().indexOf(keyword) != -1).length > 0)
        || (x.company != undefined && x.company != null && x.company.phoneNumbers != undefined && x.company.phoneNumbers != null && x.company.phoneNumbers.filter(z => z != undefined && z != null && z.toLowerCase().indexOf(keyword) != -1).length > 0)
        || (x.jobTitle != undefined && x.jobTitle != null && x.jobTitle.toLowerCase().indexOf(keyword) != -1)
        || (x.notes != undefined && x.notes != null && x.notes.toLowerCase().indexOf(keyword) != -1)
        || (x.salary != undefined && x.salary != null && x.salary.toLowerCase().indexOf(keyword) != -1)
        || (x.employees != undefined && x.employees != null && x.employees.filter(z => z.name != undefined && z.name != null && z.name.toLowerCase().indexOf(keyword) != -1).length > 0)
        || (x.employees != undefined && x.employees != null && x.employees.filter(z => z.email != undefined && z.email != null && z.email.toLowerCase().indexOf(keyword) != -1).length > 0)
        || (x.employees != undefined && x.employees != null && x.employees.filter(z => z.phoneNumber != undefined && z.phoneNumber != null && z.phoneNumber.toLowerCase().indexOf(keyword) != -1).length > 0)
        || (x.toDo != undefined && x.toDo != null && x.toDo.filter(z => z.title != undefined && z.title != null && z.title.toLowerCase().indexOf(keyword) != -1).length > 0)
      )
    });
  }

  ngOnInit(): void {
    this.filteredApplications = this.applications;
    if (this.filteredApplications != undefined && this.filteredApplications != null) {
      for (let i = 0; i < this.filteredApplications.length; i++) {
        let application = this.filteredApplications[i];
        if (application.employees != undefined && application.employees != null && application.employees.length > 0) {
          for (let j = 0; j < application.employees.length; j++) {
            let employee = application.employees[j];
            if (employee.pictureId != undefined && employee.pictureId != null && employee.pictureId.trim().length > 0)
              this.DownloadImageAsBlob(employee.pictureId);
          }
        }
      }
    }
  }

  Download(objectId: string) {
    this._objectService.Download(objectId);
  }

  DownloadImageAsBlob(objectId: string) {
    this._objectService.DownloadImageAsBlob(objectId).subscribe((blob) => {
      var file = new Blob([blob], { type: 'image/jpeg' });
      let image = this._images.find(x => x.ObjectId == objectId);
      if (image == undefined || image == null) {
        image = new EmployeeImage();
        image.ObjectId = objectId;
        image.Image = file;
        this._images.push(image)
      }
    });
  }

  LoadImage(objectId: string) {
    if (objectId == undefined || objectId == null || objectId == "")
      return "assets/images/profile.jpg";

    let image = this._images.find(x => x.ObjectId == objectId);
    if (image == undefined || image == null)
      return "assets/images/profile.jpg";

    let url = URL.createObjectURL(image.Image);
    let imageUrl = this.sanitizer.bypassSecurityTrustUrl(url);
    return imageUrl;
  }

  UnDoneToDo(toDo: ApplicationToDoItemViewModel[]) {
    return toDo?.filter(x => !x.isDone);
  }

  OpenNotesDialog(applicationId: string, notes: string): void {
    const dialogRef = this._dialog.open(NoteDialogComponent, {
      width: window.innerWidth + 'px',
      data: { notes: notes }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == undefined)
        return;

      this._applicationService.PatchNotes(applicationId, result.notes).subscribe(() => {
        this._applicationService.Subject.next(true);
        this._sharedService.toastSuccess("Notes updated successfully.")
      });
    });
  }

  OpenToDoDialog(applicationId: string, todo: ApplicationToDoItemViewModel[]): void {
    const dialogRef = this._dialog.open(TodoDialogComponent, {
      width: '80vw',
      height: '60vh',
      data: {
        todo: todo == null ? null : todo.map(x => {
          return {
            id: x.id,
            value: x.isDone,
            newValue: x.isDone,
            title: x.title
          }
        })
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == undefined)
        return;

      let toDoIds: Array<string> = new Array<string>();
      for (let item of result.todo) {
        if (item.value != item.newValue)
          toDoIds.push(item.id);
      }

      this._applicationService.CreateAndPatchToDo(applicationId, result.title, toDoIds).subscribe(() => {
        this._applicationService.Subject.next(true);
        this._sharedService.toastSuccess("Submitted successfully.");
      });
    });
  }

  OpenStateDialog(applicationId: string, stateId: number): void {
    const dialogRef = this._dialog.open(StateDialogComponent, {
      width: '400px',
      data: { stateId: stateId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == undefined)
        return;

      if ((result.logMessage == undefined || result.logMessage == null || result.logMessage.trim() == "") && result.stateId == stateId)
        return;

      this._applicationService.PatchState(applicationId, result.stateId, result.logMessage).subscribe(() => {
        this._applicationService.Subject.next(true);
        this._sharedService.toastSuccess("State updated successfully.")
      });
    });
  }

  OpenDeleteDialog(applicationId: string): void {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      width: '80vw',
      data: { message: "Are you sure?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == undefined)
        return;

      this._applicationService.Delete(applicationId).subscribe(() => {
        this._applicationService.Subject.next(true);
        this._sharedService.toastSuccess("Application deleted successfully.")
      });
    });
  }

  OpenLogMessagesDialog(logMessages: ApplicationHistoryItemViewModel[]): void {
    const dialogRef = this._dialog.open(LogMessageDialogComponent, {
      width: window.innerWidth + 'px',
      data: { logMessages: logMessages }
    });
  }

  Update(applicationId: string) {

  }
}
