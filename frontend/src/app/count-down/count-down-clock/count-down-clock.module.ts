import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountDownClockComponent } from './count-down-clock.component';
import { FlipCardComponent } from './flip-card/flip-card.component';
import { FlipClockComponent } from './flip-clock/flip-clock.component';



@NgModule({
  declarations: [
    CountDownClockComponent,
    FlipCardComponent,
    FlipClockComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CountDownClockComponent
  ]
})
export class CountDownClockModule { }
