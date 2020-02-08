import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToArrayPipe } from './to-array';



@NgModule({
  declarations: [
    ToArrayPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ToArrayPipe
  ]
})
export class ToArrayPipeModule { }
