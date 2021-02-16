import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Journal } from 'src/app/Models/Journal';
import { DateFormatPipe } from 'src/app/date-format-pipe.pipe';
@Injectable({
  providedIn: 'root'
})
export class JournalService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient,private dateformatpipe:DateFormatPipe) { }
  getJournalPage(date:Date): Observable<Journal> {
    console.log(this.baseUrl);
    return this.http.get<Journal>(this.baseUrl + 'JournalBook/'+this.dateformatpipe.transform(date) );
  }
  updateUser(date:Date,journalPage:Journal){
    return this.http.put(this.baseUrl+'JournalBook/'+this.dateformatpipe.transform(date),Journal);
  }
  postJournalPage(journalPage:Journal){
    console.log(journalPage);
    return this.http.post(this.baseUrl+'JournalBook/'+this.dateformatpipe.transform(journalPage.date),journalPage);
  }
  deleteJournalPage(id:number){
    return this.http.delete(this.baseUrl+'JournalBook/'+id);
  }
}
