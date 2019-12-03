import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountDownRoutingModule } from './count-down-routing.module';
import { CountDownComponent } from './count-down.component';
import { CountDownClockModule } from './count-down-clock/count-down-clock.module';

import { MatCardModule } from '@angular/material/card'; 

@NgModule({
  declarations: [CountDownComponent],
  imports: [
    CommonModule,
    CountDownRoutingModule,
    CountDownClockModule,
    MatCardModule
  ]
})
export class CountDownModule { }
