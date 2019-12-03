import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppBarComponent } from './app-bar.component';
import { EventsListModule } from '../events-list/events-list.module';



@NgModule({
  declarations: [AppBarComponent],
  imports: [
    CommonModule,
    EventsListModule
  ],
  exports: [
    AppBarComponent
  ]
})
export class AppBarModule { }
