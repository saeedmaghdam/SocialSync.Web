import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { State } from 'src/app/constants/state.enum';

export interface StateDialogData {
  operation: string;
  stateId: number;
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
  }

}
