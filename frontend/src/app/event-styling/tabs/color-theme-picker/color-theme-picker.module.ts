import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorThemePickerComponent } from './color-theme-picker.component';
import { ColorThemeElementComponent } from './color-theme-element/color-theme-element.component';
import { MatIconModule } from '@angular/material';



@NgModule({
  declarations: [
    ColorThemePickerComponent,
    ColorThemeElementComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    ColorThemePickerComponent
  ]
})
export class ColorThemePickerModule { }
