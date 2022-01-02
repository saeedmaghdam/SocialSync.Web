import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApplicationHistoryItemViewModel } from 'src/app/services/application/view-models/application-view-model';

export interface LogMessageDialogData {
  logMessages: ApplicationHistoryItemViewModel[]
}

@Component({
  selector: 'app-log-message-dialog',
  templateUrl: './log-message-dialog.component.html',
  styleUrls: ['./log-message-dialog.component.sass']
})
export class LogMessageDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<LogMessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LogMessageDialogData,
  ) {}
}
