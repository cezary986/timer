import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventAddComponent } from './event-add.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormErrorModule } from '../common/components/form-error/form-error.module';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    EventAddComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatDatepickerModule,
    MatButtonModule,
    FormErrorModule,
  ],
  exports: [
    EventAddComponent
  ],
  entryComponents: [
    EventAddComponent
  ]
})
export class EventAddModule { }
