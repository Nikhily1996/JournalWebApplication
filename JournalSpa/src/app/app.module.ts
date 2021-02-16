import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { JournalComponent } from './journal/journal.component';
import { BucketListComponent, DialogOverviewExampleDialog } from './bucket-list/bucket-list.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { DateFormatPipe } from 'src/app/date-format-pipe.pipe';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    ToDoListComponent,
    JournalComponent,
    BucketListComponent,
    DateFormatPipe,
    DialogOverviewExampleDialog
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTableModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    MatIconModule,
    MatGridListModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSortModule,
    MatDialogModule,
    MatTabsModule
  ],
  entryComponents: [
    DialogOverviewExampleDialog
  ],
  providers: [DateFormatPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
