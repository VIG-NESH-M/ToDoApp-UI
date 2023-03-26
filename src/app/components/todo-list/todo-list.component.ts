import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { RestapiService } from 'src/app/restapi.service';
import { NzMessageService } from 'ng-zorro-antd/message';

interface ColumnItem {
  name: string;
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  constructor(private restApi:RestapiService, private notification:NzMessageService){

  }
  ngOnInit(): void {
    this.getAll();
  }
  listOfData:any=[];
  listOfColumns: ColumnItem[] = [
    {
      name: 'Todo Id'
    },
    {
      name: 'Todo List'
    }

  ];

  todo : Todo[]=[];

  getAll(){
    this.restApi.getAllTodo().subscribe(
      data=>{
        console.log("Success",data)
        this.notification.success("Todo fetched successfully")
        this.todo = data.responseData
        this.listOfData = this.todo
      },error=>{
        console.log("Error Occured",error)
        this.notification.error("Getting todo failed")
      }
      
    )
  }


}
