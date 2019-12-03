import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountDownClockComponent } from './count-down-clock.component';

describe('CountDownClockComponent', () => {
  let component: CountDownClockComponent;
  let fixture: ComponentFixture<CountDownClockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountDownClockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountDownClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
