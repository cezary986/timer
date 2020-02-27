import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorThemeElementComponent } from './color-theme-element.component';

describe('ColorThemeElementComponent', () => {
  let component: ColorThemeElementComponent;
  let fixture: ComponentFixture<ColorThemeElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorThemeElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorThemeElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
