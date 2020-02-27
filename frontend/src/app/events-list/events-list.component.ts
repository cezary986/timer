import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../common/models/event';
import { EventsService } from '../common/service/events.service';
import { DataStoreService } from '../common/service/data-store.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { EventAddComponent } from '../event-add/event-add.component';

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
    this.dataStore.setCurrentEvent(event.id);
  }

  public onEventDeleteClick(event: Event) {
    this.eventService.removeEvent(event.id).subscribe((res) => {
      this.dataStore.removeEvent(event.id);
    });
  }

  public onEventEditClick(event: Event) {
    const dialogRef = this.dialog.open(EventAddComponent, {
      data: event
    });
  }
}
