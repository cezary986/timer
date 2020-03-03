import { Component, OnInit } from '@angular/core';
import { Event } from '../common/models/event';
import { EventsService } from '../common/service/events.service';
import { DataStoreService } from '../common/service/data-store.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { EventAddComponent } from '../event-add/event-add.component';
import { StateService } from '../common/service/state.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {

  public currentEvent: Observable<Event> = null;
  events: Observable<Event[]> = null;

  constructor(
    private eventService: EventsService,
    private dataStore: DataStoreService,
    private stateService: StateService,
    public dialog: MatDialog
  ) {
    this.currentEvent = this.dataStore.getCurrentEvent();
    this.events = this.dataStore.getEvents();
  }

  ngOnInit() {
    this.eventService.getEvents()
      .subscribe((res) => {
        this.dataStore.setEvents(res);
      });
  }

  public onEventSelect(event: Event) {
    this.dataStore.setCurrentEventId(event.id);
    const newState = this.stateService.state;
    newState.eventId = event.id;
    this.stateService.setState(newState).subscribe((res) => {});
  }

  public onEventDeleteClick(event: Event) {
    this.eventService.removeEvent(event.id).subscribe((res) => {
      this.dataStore.removeEvent(event.id);
      const newState = this.stateService.state;
      newState.eventId = null;
      this.stateService.setState(newState).subscribe((res) => {});
    });
  }

  public onEventEditClick(event: Event) {
    const dialogRef = this.dialog.open(EventAddComponent, {
      data: event
    });
  }
}
