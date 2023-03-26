import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Todo } from 'src/app/models/Todo';
import { RestapiService } from 'src/app/restapi.service';

interface ColumnItem {
  name: string;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  validateForm!: UntypedFormGroup;

  submitForm(): void {
    console.log('submit', this.validateForm.value);
    this.createTodo(this.validateForm.value);
  }

  constructor(private fb: UntypedFormBuilder, private restApi :RestapiService, private notification: NzMessageService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      list: [null, [Validators.required]],
    });
    this.getAll();

  }
  createTodo(todo:Todo){
    this.restApi.createTodo(todo).subscribe(
      data=>{
        console.log("Success", data)
        this.notification.success("Todo Created Successfully")
        this.ngOnInit();
        ++this.x;
      },
      error=>{
        console.log("Failed", error)
        this.notification.error("Failed to create Todo")
      }
    )
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

  x = 0;
  id= [{ii:1},{ii:2}];

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
deleteTodo(id:number){
  console.log(id)
  this.restApi.deleteTodo(id).subscribe(
    date=>{
      this.notification.success("Todo deleted Successfully")
      this.ngOnInit()
      this.x--;
    },error=>{
      this.notification.error("Failed to delete Todo")
    }
  )
}
chg : boolean = false
click(){
this.chg = !this.chg
this.notification.info("This is Apple")
}
click1(){
  this.chg = !this.chg
  this.notification.info("This is Android")
  }

}
