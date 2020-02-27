import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { EventComponent } from './event.component';
import { CountDownModule } from '../count-down/count-down.module';
import { MatButtonModule, MatIconModule, MatDialogModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { EventStylingModule } from '../event-styling/event-styling.module';


@NgModule({
  declarations: [EventComponent],
  imports: [
    CommonModule,
    TranslateModule,
    EventRoutingModule,
    EventStylingModule,
    CountDownModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class EventModule { }
