import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { State } from 'src/app/constants/state.enum';

export interface StateDialogData {
  stateId: number;
  logMessage: string;
  dateTime: Date;
}

@Component({
  selector: 'app-state-dialog',
  templateUrl: './state-dialog.component.html',
  styleUrls: ['./state-dialog.component.sass']
})
export class StateDialogComponent implements OnInit {
  stateEnum = State;

  constructor(public dialogRef: MatDialogRef<StateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StateDialogData) {
  }

  ngOnInit(): void {
    this.data.dateTime = new Date();
  }

  Submit() {
    this.dialogRef.close(this.data);
  }

  OnChangeState(event: any){
    this.data.stateId = parseInt(event.value);
  }
}
