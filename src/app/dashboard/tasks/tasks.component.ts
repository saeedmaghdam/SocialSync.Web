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
  output: any; 
  viewContent = true;
  createeditContent = false;

  constructor(private formBuilder: FormBuilder, tasksService: TasksService, sharedService: SharedService, paginationService: PaginationService) {
    this._tasksService = tasksService;
    this._sharedService = sharedService;
    this._paginationService = paginationService;

  }
 
  

  displayedColumns: string[] = ['action', 'product', 'selector'];
  taskdataSource = eaadata.data;
  
  ngOnInit(): void {
    debugger
    //this.GetTaskList();
}



GetTaskList() {
    this._tasksService.TasksList(1,"google.com")
        .subscribe((result: any) => {
          debugger;
            console.log(result.headers);
            this.taskdataSource=result;
            //this.tasktotalCount = JSON.parse(result.headers.get('X-Pagination')).totalCount;
 
            //this.taskdataSource = new MatTableDataSource<TasksResponseModel>(result.body.value);
            
          }, (data) => {
            this._sharedService.toastError(data.message);
        });
}

ShowViewContent(){
  this.viewContent = true;
  this.createeditContent = false;
}

ShowCreateEditContent(){
  this.viewContent = false;
  this.createeditContent = true;
}

onSubmit() {

  console.log('Submit');
 
  // this._tasksService.SaveTask(this.MemberModel).subscribe(
  //     response => 
  //     {
  //         this.output = response
  //         if (this.output.StatusCode == "409") {
  //             alert('Member Already Exists');
  //         }
  //         else if (this.output.StatusCode == "200") {
  //             alert('Member Added Successfully');
  //             this._Route.navigate(['/Member/All']);
  //         }
  //         else {
  //             alert('Something Went Wrong');
  //         }
  //     });

 
}

// payonPageSwitch(event: PageEvent) {
//   this._paginationService.change(event);
//   this.GetTaskList();
// }
// applyFilter(filterValue: string) {
//     console.log(filterValue);
//     console.log("###");

//     filterValue = filterValue.toLowerCase();
//     this.taskdataSource.filter((it: any) => 
//         {
//         var d = it.toLowerCase().includes(filterValue);
//         console.log(d);
//     }); 
// }

}
