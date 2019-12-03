import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsListComponent } from './events-list.component';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [EventsListComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatDividerModule
  ],
  exports: [
    EventsListComponent
  ]
})
export class EventsListModule { }
