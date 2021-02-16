import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { bucketList } from 'src/app/Models/bucketList';

@Injectable({
  providedIn: 'root'
})
export class BucketListService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getPendingbucketList(): Observable<bucketList[]> {
    return this.http.get<bucketList[]>(this.baseUrl + 'BucketList');
  }
  getCompletedbucketList(): Observable<bucketList[]> {
    return this.http.get<bucketList[]>(this.baseUrl + 'BucketList/completed');
  }
  
  postToDoItems(bucketListItem:bucketList){
    return this.http.post(this.baseUrl+'BucketList/addBucketListItem',bucketListItem);
  }
  updatebucketList(bucketListItem:bucketList){
    return this.http.put(this.baseUrl+'BucketList/setBucketListItem',bucketListItem);
  }
  deletebucketList(id:number){
    return this.http.delete(this.baseUrl+'BucketList/'+id);
  }
}
