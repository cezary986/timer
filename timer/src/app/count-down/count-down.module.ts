import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountDownRoutingModule } from './count-down-routing.module';
import { CountDownComponent } from './count-down.component';
import { FlipClockComponent } from './flip-clock/flip-clock.component';
import { FlipCardComponent } from './flip-card/flip-card.component';


@NgModule({
  declarations: [CountDownComponent, FlipClockComponent, FlipCardComponent],
  imports: [
    CommonModule,
    CountDownRoutingModule
  ]
})
export class CountDownModule { }
