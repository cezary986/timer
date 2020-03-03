import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountDownComponent } from './count-down.component';
import { CountDownClockModule } from './count-down-clock/count-down-clock.module';

import { MatCardModule } from '@angular/material/card';
import { LoaderModule } from '../common/components/loader/loader.module';

@NgModule({
  declarations: [
    CountDownComponent
  ],
  imports: [
    CommonModule,
    CountDownClockModule,
    MatCardModule,
    LoaderModule
  ],
  exports: [
    CountDownComponent
  ]
})
export class CountDownModule { }
