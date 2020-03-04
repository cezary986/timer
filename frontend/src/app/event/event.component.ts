import { Component } from '@angular/core';
import { Event } from '../common/models/event';
import { DataStoreService } from '../common/service/data-store.service';
import { MatDialog } from '@angular/material';
import { EventStylingComponent } from '../event-styling/event-styling.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent {

  public event: Event = null;
  public events: Observable<Event[]> = this.dataStore.getEvents();
  public eventDate: Date = null;

  constructor(
    private dataStore: DataStoreService,
    public dialog: MatDialog
  ) {
    this.dataStore.getCurrentEvent()
    .subscribe((res) => {
      this.event = res;
      if (this.event !== null) {
        this.eventDate = new Date(this.event.date);
      } else {
        this.eventDate = null;
      }
    });
  }
  public onEventStylingButtonClick() {
    const dialogRef = this.dialog.open(EventStylingComponent, {
      data: null
    });
  }
}
