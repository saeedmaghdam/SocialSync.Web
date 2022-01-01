import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  operation: string;
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

  AddToDo($event: Event) {
    this.data.operation = 'addToDo';
    console.log(this.title)
    this.data.title = this.title;
    this.dialogRef.close(this.data);
  }
}
