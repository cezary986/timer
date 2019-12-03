import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../common/models/event';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {

  @Input() events: Event[];

  constructor() { }

  ngOnInit() {
  }

}
