import { Injectable } from '@angular/core';
import { IgorService } from 'src/app/igor/igor.service';
import { Observable } from 'rxjs';
import { ColorTheme } from '../models/color-theme';
import { environment } from 'src/environments/environment';

function hexToRgb(hexString) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexString);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function luminanace(r, g, b) {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928
      ? v / 12.92
      : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function contrast(rgb1, rgb2) {
  const lum1 = luminanace(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = luminanace(rgb2.r, rgb2.g, rgb2.b);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05)
    / (darkest + 0.05);
}

function selectTextColor(bgColorHexString: string): '#000000' | '#FFFFFF' {
  const bgColorToBlackContrast = contrast(hexToRgb(bgColorHexString), { r: 0, g: 0, b: 0 });
  if (bgColorToBlackContrast >= 4) {
    return '#000000';
  } else {
    return '#FFFFFF';
  }
}

@Injectable({
  providedIn: 'root'
})
export class ThemesService {

  private styleElementId = 'event-styles';
  private styleElement = null;

  private actions = {
    GET_THEMES: 'color_themes.get',
  };

  constructor(
    private igorService: IgorService
  ) { }

  public getThemes(): Observable<ColorTheme[]> {
    return this.igorService.dispatch<ColorTheme[]>(this.actions.GET_THEMES);
  }

  public applyTheme(theme: ColorTheme, backgroundImage?: string) {
    if (theme === null || theme === undefined) {
      return;
    }
    this.styleElement = this.styleElement === null ? document.getElementById(this.styleElementId) : this.styleElement;
    if (this.styleElement === null) {
      this.addStyleElement();
    }
    const textColorPrimary = theme.textColor !== null ? theme.textColor : selectTextColor(theme.colorPrimary);
    const textColorSecondary = selectTextColor(theme.colorSecondary);
    const textColorBackground = selectTextColor(theme.colorBackground);
    let css =
      ' body { background-color: ' + theme.colorBackground + '; color: ' + textColorBackground + ' !important; }' +
      ' .mat-expansion-panel-body { background-color: white; }' +
      ' .mat-expansion-panel-header-title { color: ' + textColorPrimary + ' !important; }' +
      ' .mat-expansion-indicator::after { color: ' + textColorPrimary + ' !important; }' +
      ' .mat-expansion-panel-header-description { color: ' + textColorPrimary + ' !important; }' +
      ' .mat-card { background-color: ' + theme.colorPrimary + '; color: ' + textColorPrimary + ' !important; }' +
      ' .number-span { background-color: ' + theme.colorPrimary + ' !important; color: ' + textColorPrimary + ' !important; }' +
      ' .fab { background-color: ' + theme.colorSecondary + ' !important; color: ' + textColorSecondary + ' !important; }' +
      ' .mat-expansion-panel { background-color: ' + theme.colorPrimary + '; color: ' + textColorPrimary + ' !important; }';
    if (backgroundImage !== null && backgroundImage !== undefined) {
      css += ' body { background-image: url("' + environment.fileServerAddress + '/' + backgroundImage + '"); }';
      this.styleElement.innerText = this.styleElement.innerText + ' body { background-image: none !important; }';
      setTimeout(() => {
        this.styleElement.innerText = css;
      }, 10);
    } else {
      this.styleElement.innerText = css;
    }
  }

  private addStyleElement() {
    const styleElement = document.createElement('style');
    styleElement.id = this.styleElementId;
    document.getElementsByTagName('head')[0].appendChild(styleElement);
    this.styleElement = styleElement;
  }

}
