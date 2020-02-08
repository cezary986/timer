import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-count-down-clock',
  templateUrl: './count-down-clock.component.html',
  styleUrls: ['./count-down-clock.component.scss']
})
export class CountDownClockComponent implements OnInit, OnDestroy {

  public initialized = false;

  @Input() set date(date: Date) {
    // this.eventDate = moment([date.getFullYear(), date.getMonth(), date.getDay()]);
    this.eventDate = date;
    this.initClock();
  }
  @Output() initialize: EventEmitter<void> = new EventEmitter();

  public days: number;
  public hours: number;
  public minutes: number;
  public seconds: number;

  private eventDate: Date;
  private todayDate: Date;

  private interval: any;

  ngOnInit() { }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }


  private initClock() {
    this.interval = setInterval(() => {
      this.updateClock();
    }, 1000);
  }

  private updateClock(first = false) {
    // get total seconds between the times
    let delta = Math.abs(this.eventDate.getTime() - new Date().getTime()) / 1000;

    // calculate (and subtract) whole days
    this.days = Math.floor(delta / 86400);
    delta -= this.days * 86400;

    // calculate (and subtract) whole hours
    this.hours = Math.floor(delta / 3600) % 24;
    delta -= this.hours * 3600;

    // calculate (and subtract) whole minutes
    this.minutes = Math.floor(delta / 60) % 60;
    delta -= this.minutes * 60;

    // what's left is seconds
    this.seconds = delta % 60;  // in theory the modulus is not required

    if (!this.initialized) {
      this.initialized = true;
      setTimeout(() => {
        this.initialize.emit();
      }, 0);
    }

  }
}
