import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventStylingComponent } from './event-styling.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { ColorThemePickerModule } from './tabs/color-theme-picker/color-theme-picker.module';

@NgModule({
  declarations: [
    EventStylingComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    ColorThemePickerModule,
    MatFormFieldModule,
    MatTabsModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    EventStylingComponent
  ],
  entryComponents: [
    EventStylingComponent
  ]
})
export class EventStylingModule { }
