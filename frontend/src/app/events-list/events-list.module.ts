import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsListComponent } from './events-list.component';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule, MatIconModule, MatDialogModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { EventAddModule } from '../event-add/event-add.module';

@NgModule({
  declarations: [
    EventsListComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MatListModule,
    EventAddModule,
    MatDialogModule,
    MatDividerModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatRippleModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  exports: [
    EventsListComponent
  ]
})
export class EventsListModule { }
