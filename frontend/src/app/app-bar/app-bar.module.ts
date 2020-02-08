import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppBarComponent } from './app-bar.component';
import { EventsListModule } from '../events-list/events-list.module';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [AppBarComponent],
  imports: [
    CommonModule,
    EventsListModule,
    MatToolbarModule
  ],
  exports: [
    AppBarComponent
  ]
})
export class AppBarModule { }
