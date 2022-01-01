import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NoteDialogComponent } from '../dialogs/note-dialog/note-dialog.component';
import { StateDialogComponent } from '../dialogs/state-dialog/state-dialog.component';
import { DialogDataItem, TodoDialogComponent } from '../dialogs/todo-dialog/todo-dialog.component';
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

  OpenNotesDialog(applicationId: string, notes: string): void {
    const dialogRef = this._dialog.open(NoteDialogComponent, {
      width: window.innerWidth + 'px',
      data: { notes: notes }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == undefined || result.operation == "cancelled")
        return;

      this._applicationService.PatchNotes(applicationId, result.notes).subscribe(() => {
        this._applicationService.Subject.next(true);
        this._sharedService.toastSuccess("Notes updated successfully.")
      });
    });
  }

  OpenToDoDialog(applicationId: string, todo: ApplicationToDoItemViewModel[]): void {
    const dialogRef = this._dialog.open(TodoDialogComponent, {
      width: '50vw',
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
      if (result == undefined || result.operation == "cancelled")
        return;

      if (result.operation == "addToDo") {
        this._applicationService.CreateToDo(applicationId, result.title).subscribe(() => {
          this._applicationService.Subject.next(true);
          this._sharedService.toastSuccess("To-do submitted successfully.");
        });
      }
      else {
        let toDoIds: Array<string> = new Array<string>();
        for (let item of result.todo) {
          if (item.value != item.newValue)
            toDoIds.push(item.id);
        }

        if (toDoIds.length == 0)
          return;

        this._applicationService.PatchToDoStatus(applicationId, toDoIds).subscribe(() => {
          this._applicationService.Subject.next(true);
          this._sharedService.toastSuccess("To-do items updated successfully.");
        });
      }
    });
  }

  OpenStateDialog(applicationId: string, stateId: number): void {
    const dialogRef = this._dialog.open(StateDialogComponent, {
      width: '400px',
      data: { stateId: stateId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

      if (result == undefined || result.operation == "cancelled")
        return;

      this._applicationService.PatchState(applicationId, result.stateId).subscribe(() => {
        this._applicationService.Subject.next(true);
        this._sharedService.toastSuccess("State updated successfully.")
      });
    });
  }

  Update(applicationId: string) {

  }
}

