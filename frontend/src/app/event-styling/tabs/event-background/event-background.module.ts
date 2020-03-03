import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventBackgroundComponent } from './event-background.component';
import { FileUploadModule } from 'src/app/common/components/file-upload/file-upload.module';
import { NotifierModule } from 'angular-notifier';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material';



@NgModule({
  declarations: [
    EventBackgroundComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FileUploadModule,
    NotifierModule,
    MatButtonModule
  ],
  exports: [
    EventBackgroundComponent
  ]
})
export class EventBackgroundModule { }
