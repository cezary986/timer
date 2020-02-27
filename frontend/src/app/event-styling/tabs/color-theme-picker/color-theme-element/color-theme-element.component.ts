import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ColorTheme } from 'src/app/common/models/color-theme';

@Component({
  selector: 'app-color-theme-element',
  templateUrl: './color-theme-element.component.html',
  styleUrls: ['./color-theme-element.component.scss']
})
export class ColorThemeElementComponent implements OnInit {

  @Input() theme: ColorTheme;
  @Input() active = false;

  @Output() themeSelected: EventEmitter<ColorTheme> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
