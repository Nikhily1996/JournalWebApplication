import { Component, OnInit ,AfterViewInit,ViewChild} from '@angular/core';
import{TodoItems} from 'src/app/Models/ToDoItems';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ToDoService } from '../services/to-do.service';
import { MatTableDataSource } from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatSort} from '@angular/material/sort';
@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {
  toDoitem: FormGroup;
  pendingDataSource: MatTableDataSource < TodoItems >;
  completedDataSource: MatTableDataSource < TodoItems >;
  pendingtabledataArray:TodoItems[];
  completedtabledataArray:TodoItems[];
  isRequiredValues=['can do','must do'];
  isCompleteValue=['false','true'];
  pendingSelection:SelectionModel<TodoItems>;
  completedSelection:SelectionModel<TodoItems>;
  constructor(private fb: FormBuilder,private toDoService:ToDoService) { }
  @ViewChild(MatSort) sort: MatSort;

  
  ngOnInit(): void {
    
    this.getPendingToDoItemToTable();
    this.getCompletedToDoItemToTable();

    this.toDoitem=this.fb.group({
      nameOfToDo:['',Validators.required],
      isRequired:['can do'],
      isComplete:['false'],
      toBeCompletedBy:[new Date(),Validators.required]
    });
  }
  postToDoItem(){
    if(this.toDoitem.valid){
      const item:TodoItems=this.toDoitem.value;
      this.toDoService.postToDoItems(item).subscribe(data=>{
        if(data){
          this.toDoService.getPendingToDoItems().subscribe(data=>{
            this.pendingtabledataArray=data;
            this.pendingDataSource=new MatTableDataSource(data);
           this.toDoitem.patchValue({nameOfToDo:'',isRequired:'can do',isComplete:'false',toBeCompletedBy:new Date()});
           this.toDoitem.get('nameOfToDo').clearValidators();
          this.toDoitem.get('nameOfToDo').updateValueAndValidity();

          });
        }
      });
    }
  }
  setComplete(event:any){


this.toDoitem.get('isComplete').setValue(event?'true':'false');

  }
  setCompleteRow(row){
    const objToUpdate=this.pendingDataSource.data.filter(obj=>obj.id==row.id);
  }
  updateToDoItem(row,rowIndex){
    const rowsToUpdate=this.pendingSelection.selected;
    rowsToUpdate.forEach(obj=>{obj.isComplete='true';
    this.toDoService.updateToDoItems(obj).subscribe();
  });  
  }
  getPendingToDoItemToTable() {
    const initialSelection = [];
    const allowMultiSelect = true;
    this.toDoService.getPendingToDoItems().subscribe(data => {
      data=data.sort((a, b) => {
        return <any>new Date(a.toBeCompletedBy)-<any>new Date(b.toBeCompletedBy );
      });
      this.pendingtabledataArray = data;
      this.pendingDataSource = new MatTableDataSource(data);
      this.pendingDataSource.sort = this.sort
      this.pendingSelection = new SelectionModel<TodoItems>(allowMultiSelect, initialSelection);
    });
  }
  getCompletedToDoItemToTable() {
    const initialSelection = [];
    const allowMultiSelect = true;
    this.toDoService.getCompletedToDoItems().subscribe(data => {
      this.completedtabledataArray = data;
      this.completedDataSource = new MatTableDataSource(data);
      this.completedSelection = new SelectionModel<TodoItems>(allowMultiSelect, initialSelection);
    });
  }
  updateCompleteToDoItem(row, rowIndex) {

    const rowsToUpdate = this.completedSelection.selected;
    //  const rowsToUnSelect=this.pendingtabledataArray.filt
    rowsToUpdate.forEach(obj => {
      obj.isComplete = 'false';
      this.toDoService.updateToDoItems(obj).subscribe(data => {
        this.getPendingToDoItemToTable();
        this.getCompletedToDoItemToTable();
      });
    });

  }
  updatePendingToDoItem(row, rowIndex) {
    const rowsToUpdate = this.pendingSelection.selected;
    rowsToUpdate.forEach(obj => {
      obj.isComplete = 'true';
      this.toDoService.updateToDoItems(obj).subscribe(data => {
        this.getPendingToDoItemToTable();
        this.getCompletedToDoItemToTable();
      });
    });

  }
  deletePendingData(row,rowIndex){
    this.toDoService.deleteToDoItems(row.id).subscribe(value=>{
      if(value){
        this.completedDataSource.data=this.completedDataSource.data.filter(x=>x.id!==row.id);
      }
    });
  }
  deleteCompletedData(row,rowIndex){
    this.toDoService.deleteToDoItems(row.id).subscribe(value=>{
      if(value){
        this.pendingDataSource.data=this.pendingDataSource.data.filter(x=>x.id!==row.id);
      }
    });
  }
  displayedColumns = ['position', 'nameOfToDo', 'isComplete', 'isRequired','toBeCompletedBy','actionsColumn'];
}




