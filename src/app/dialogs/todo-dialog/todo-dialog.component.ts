import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  todo: DialogDataItem[];
  title: string;
}

export interface DialogDataItem {
  id: string;
  value: boolean;
  newValue: boolean;
  title: string;
}

@Component({
  selector: 'app-todo-dialog',
  templateUrl: './todo-dialog.component.html',
  styleUrls: ['./todo-dialog.component.sass']
})
export class TodoDialogComponent {

  title!: string;

  constructor(
    public dialogRef: MatDialogRef<TodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  Submit() {
    this.dialogRef.close(this.data);
  }
}
