import { Component, OnInit, Input  } from '@angular/core';
import { FormBuilder  } from '@angular/forms'; 
import { SharedService } from 'src/app/services/shared/shared.service'; 
import { PaginationService } from 'src/app/services/shared/pagination.service'; 
import { TasksService } from '../../services/tasks/tasks.service'; 


const eaadata  = {
  "data": [
    {
      "action": "string",
      "selector": {
        "productId": "1",
        "title": "test"
      },
      "product": {
        "title": "Test",
        "description": "ssaf",
        "price": "string",
        "url": "string",
        "imageUrls": [
          "string"
        ]
      }
    }
  ],
  "error": {
    "errorCode": "string",
    "errorDescription": "string"
  },
  "meta": "string"
};

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.sass']
})
export class TasksComponent implements OnInit {
  _tasksService: TasksService;
  _sharedService: SharedService;
  _paginationService: PaginationService;
  tasktotalCount: number = 0;
  taskdataSource: any; 
  output: any; 
  viewContent = true;
  createeditContent = false;

  constructor(private formBuilder: FormBuilder, tasksService: TasksService, sharedService: SharedService, paginationService: PaginationService) {
    this._tasksService = tasksService;
    this._sharedService = sharedService;
    this._paginationService = paginationService;

  }
  
  displayedColumns: string[] = ['productId',  'selectortitle', 'action',  'title',  'description', 'price', 'imageUrls'];
  //taskdataSource = eaadata.data;
  
  ngOnInit(): void {
    debugger
    this.GetTaskList();
}



GetTaskList() {
    this._tasksService.TasksList(1,"google.com")
        .subscribe((result: any) => {
          debugger;
            console.log(result.data);
            this.taskdataSource=result.data;
        
          }, (data) => {
            this._sharedService.toastError(data.message);
        });
}


}
