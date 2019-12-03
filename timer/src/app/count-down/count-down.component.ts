import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.scss']
})
export class CountDownComponent implements OnInit {

  public eventDate: Date;
  public clockInitialized = false;

  constructor() {
    this.eventDate = new Date(2021, 7, 28, 12, 0, 0);
  }

  ngOnInit() {
  }

}
