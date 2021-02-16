import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { DateFormatPipe } from 'src/app/date-format-pipe.pipe';
import { TodoItems } from '../Models/ToDoItems';
@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient,private dateformatpipe:DateFormatPipe) { }
  getPendingToDoItems(): Observable<TodoItems[]> {
    console.log(this.baseUrl);
    return this.http.get<TodoItems[]>(this.baseUrl + 'ToDo/pending');
  }
  getCompletedToDoItems(): Observable<TodoItems[]> {
    return this.http.get<TodoItems[]>(this.baseUrl + 'ToDo/completed');
  }
  updateToDoItems(todoItem:TodoItems){
    return this.http.put(this.baseUrl+'ToDo/update',todoItem);
  }
  postToDoItems(todoItem:TodoItems){
    return this.http.post(this.baseUrl+'ToDo/'+this.dateformatpipe.transform(todoItem.toBeCompletedBy),todoItem);
  }
  deleteToDoItems(id:number){
    return this.http.delete(this.baseUrl+'ToDo/'+id);
  }
}
