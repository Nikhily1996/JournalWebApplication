import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Journal } from 'src/app/Models/Journal';
import { JournalService } from 'src/app/services/journal-service.service';
@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit {
  date = new FormControl();
  JournalPageText = new FormControl('');
  special: boolean = false;
  journalPage:Journal;
  constructor(private journalService: JournalService) { }


  ngOnInit(): void {
    this.date.valueChanges.subscribe(date => { this.getJournalPage(date); console.log(date); })
    this.date.setValue(new Date());
  }
  getJournalPage(date: Date) {
    this.journalService.getJournalPage(date).subscribe(data => {
      console.log(data);
      if (data && data.todaysJounral) {
        this.journalPage=data;
        if (data.todaysJounral.length > 0) {
          this.JournalPageText.setValue(data.todaysJounral);
        }
        if (data.special.length > 0) {
          if (data.special.toLowerCase() === 'true') {
            this.special = true;
          }
          else {
            this.special = false;
          }
        }
      }else{
          this.JournalPageText.setValue('');
          this.journalPage=null;
          this.special=false;
      }
    });
  }
  deleteJournalPage(){
    if(this.journalPage){
      this.journalService.deleteJournalPage( this.journalPage.id).subscribe(data=>{
        this.special=false;
        this.JournalPageText.setValue('');
      });
    }
  }
  setJournalPageAsSpecial() {
    this.special = this.special?false:true;
  }
  postJournalPage() {
    const journalPage: Journal = {
      id: null,
      todaysJounral: this.JournalPageText.value,
      date: this.date.value,
      special: this.special ? "true" : "false"
    };
    delete journalPage.id;
    this.journalService.postJournalPage(journalPage).subscribe();
  }

}
