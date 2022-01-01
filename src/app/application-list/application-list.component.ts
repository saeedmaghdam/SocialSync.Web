import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NoteDialogComponent } from '../note-dialog/note-dialog.component';
import { ApplicationService } from '../services/application/application.service';
import { ApplicationToDoItemViewModel, ApplicationViewModel } from '../services/application/view-models/application-view-model';
import { ObjectService } from '../services/object/object.service';
import { SharedService } from '../services/shared/shared.service';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.sass']
})
export class ApplicationListComponent implements OnInit {
  @Input() applications!: ApplicationViewModel[];
  @Input() totalApplicationsCount!: number;
  @Input() emptyMessage!: string;

  private _objectService: ObjectService;
  private _applicationService: ApplicationService;
  private _sharedService: SharedService;
  private _dialog: MatDialog;

  constructor(objectService: ObjectService, applicationService: ApplicationService, sharedService: SharedService, dialog: MatDialog) {
    this._objectService = objectService;
    this._applicationService = applicationService;
    this._sharedService = sharedService;
    this._dialog = dialog;
  }

  ngOnInit(): void {
  }

  Download(objectId: string) {
    this._objectService.Download(objectId);
  }

  UnDoneToDo(toDo: ApplicationToDoItemViewModel[]) {
    return toDo?.filter(x => !x.isDone);
  }

  openNotesDialog(applicationId: string, notes: string): void {
    const dialogRef = this._dialog.open(NoteDialogComponent, {
      width: window.innerWidth + 'px',
      data: {notes: notes}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.operation == "cancelled")
        return;

      this._applicationService.PatchNotes(applicationId, result.notes).subscribe(() => {
        this.applications.find(x=> x.id == applicationId)!.notes = result.notes;
        this._sharedService.toastSuccess("Notes updated successfully.")
      });
    });
  }
}

