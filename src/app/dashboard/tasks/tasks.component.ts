import { Component, OnInit, Input  } from '@angular/core';
import { FormBuilder  } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table'; 
import { SharedService } from 'src/app/services/shared/shared.service';
import { TasksResponseModel } from '../../services/tasks/models/tasks-model';
import { TasksService } from '../../services/tasks/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.sass']
})
export class TasksComponent implements OnInit {
  _tasksService: TasksService;
  _sharedService: SharedService;
  
  constructor(private formBuilder: FormBuilder, tasksService: TasksService, sharedService: SharedService) {
    this._tasksService = tasksService;
    this._sharedService = sharedService;
    debugger;
  }
 
  taskdataSource = new MatTableDataSource<TasksResponseModel>();
  displayedColumns: string[] = ['title', 'description', 'price'];

  GetTaskList() {
    debugger;
    this._tasksService.TasksList("1", "google.com").subscribe((data) => {
      debugger
     let tss = data;
       
  }, (data) => {
      this._sharedService.toastError(data.error.error.error_description);
  });
  }
  




    @Input('taskdataSource')
    set dataSourceForTable(value: TasksResponseModel[]) {
        this.taskdataSource = new MatTableDataSource<TasksResponseModel>(value);
    }
    
  ngOnInit(): void {
    this.GetTaskList();
  }
}
