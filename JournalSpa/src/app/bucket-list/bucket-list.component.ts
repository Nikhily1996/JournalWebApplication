import { Component, OnInit,Inject } from '@angular/core';
import { bucketList } from 'src/app/Models/bucketList';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BucketListService } from '../services/bucket-list.service';
import { MatTableDataSource } from '@angular/material/table';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-bucket-list',
  templateUrl: './bucket-list.component.html',
  styleUrls: ['./bucket-list.component.css']
})
export class BucketListComponent implements OnInit {
  BucketItem: FormGroup;
  pendingDataSource: MatTableDataSource<bucketList>;
  pendingtabledataArray: bucketList[];
  isCompleteValue = ['false', 'true'];
  constructor(private fb: FormBuilder, private bucketListService: BucketListService,public dialog: MatDialog) { }
  ngOnInit(): void {
    this.getPendingbucketListToTable();
    this.BucketItem = this.fb.group({
      nameOfBucketItem: ['', Validators.required],
      photosLink: [''],
      isComplete: ['false']
    });
  }
  postBucketItem() {
    if (this.BucketItem.valid) {
      const item: bucketList = this.BucketItem.value;
      this.bucketListService.postToDoItems(item).subscribe(data => {
        if (data) {
          this.bucketListService.getPendingbucketList().subscribe(data => {
            this.pendingtabledataArray = data;
            this.pendingDataSource = new MatTableDataSource(data);
            this.BucketItem.patchValue({ nameOfBucketItem: '', photosLink: '', isComplete: 'false' });
            this.BucketItem.get('nameOfBucketItem').reset();
          });
        }
      });
    }
  }
  getPendingbucketListToTable() {
    this.bucketListService.getPendingbucketList().subscribe(data => {
      this.pendingtabledataArray = data;
      this.pendingDataSource = new MatTableDataSource(data);
    });
  }

  setComplete(event: any) {
    this.BucketItem.get('isComplete').setValue(event ? 'true' : 'false');
  }
  setCompleteRow(row) {
    const objToUpdate = this.pendingDataSource.data.filter(obj => obj.id == row.id);
  }
  animal: string;
  name: string;
  updatebucketList(row, rowIndex) {
    console.log('test')
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '800px',
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.bucketListService.updatebucketList(result).subscribe(data => {
       /// this.getPendingbucketListToTable();
      });
      //this.animal = result;
    });
   
   

    

  }
  deletePendingData(row, rowIndex) {
    this.bucketListService.deletebucketList(row.id).subscribe(value => {
      if (value) {
        this.pendingDataSource.data = this.pendingDataSource.data.filter(x => x.id !== row.id);
      }
    });
  }
  displayedColumns = ['position', 'name', 'isComplete', 'photosLink', 'actionsColumn'];
}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './bucket-list-edit.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: bucketList) {}
    setComplete(event: any) {
      this.data.isComplete=event ? 'true' : 'false';
    }
  onNoClick(): void {
    this.dialogRef.close();
  }

}



