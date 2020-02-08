import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../common/models/event';
import { DataStoreService } from '../common/service/data-store.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  public _event: Event = null;
  @Input() set event(value: Event) {
    this._event = value;
    if (value !== null && value !== undefined) {
      this.eventDate = new Date(value.date);
    }
  }
  public eventDate: Date = null;

  constructor(
    private dataStore: DataStoreService
  ) {
    this.dataStore.getCurrentEvent().subscribe((res) => {
      this.event = res;
    });
  }

  ngOnInit() {
  }

}
