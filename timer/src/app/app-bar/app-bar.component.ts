import { Component, OnInit } from '@angular/core';
import { Event } from '../common/models/event';

@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent implements OnInit {

  public events: Event[] = [
    {
      title: "Wesele",
      date: new Date().getTime()
    },
    {
      title: "Wakacje",
      date: new Date().getTime()
    },
    {
      title: "Obrona pracy",
      date: new Date().getTime()
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
