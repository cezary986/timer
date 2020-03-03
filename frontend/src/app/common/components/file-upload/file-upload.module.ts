import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { FileListComponent } from './file-list/file-list.component';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { NgxFilesizeModule } from 'ngx-filesize';


@NgModule({
  declarations: [
    FileUploadComponent,
    FileListComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule.forChild(),
    MatListModule,
    MatDividerModule,
    NgxFilesizeModule
  ],
  exports: [
    FileUploadComponent
  ]
})
export class FileUploadModule {}
