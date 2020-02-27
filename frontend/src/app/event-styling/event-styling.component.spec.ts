import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventStylingComponent } from './event-styling.component';

describe('EventStylingComponent', () => {
  let component: EventStylingComponent;
  let fixture: ComponentFixture<EventStylingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventStylingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventStylingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
