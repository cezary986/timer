import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventBackgroundComponent } from './event-background.component';

describe('EventBackgroundComponent', () => {
  let component: EventBackgroundComponent;
  let fixture: ComponentFixture<EventBackgroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventBackgroundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
