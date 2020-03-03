import { Injectable } from '@angular/core';
import { Event } from '../models/event';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { ThemesService } from './themes.service';
import { first, filter, min } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  private events: BehaviorSubject<Event[]> = new BehaviorSubject(null);
  private currentEvent: BehaviorSubject<Event> = new BehaviorSubject(null);

  constructor(
    private themeService: ThemesService
  ) { }

  public getEvents(): Observable<Event[]> {
    return this.events;
  }

  public setEvents(events: Event[]) {
    this.events.next(events);
  }

  public addEvent(event: Event) {
    const events = this.events.value;
    events.push(event);
    this.events.next(events);
  }

  public updateEvent(event: Event) {
    const events = this.events.value;
    events[events.findIndex((e) => e.id === event.id)] = event;
    this.events.next(events);

    if (this.currentEvent.value.id === event.id) {
      this.currentEvent.next(event);
    }
  }

  public removeEvent(eventId: number) {
    const events = this.events.value;
    events.splice(events.findIndex((e) => e.id === eventId, 1));
    this.events.next(events);

    if (this.currentEvent.value.id === eventId) {
      this.currentEvent.next(null);
    }
  }

  public getCurrentEvent(): Observable<Event> {
    return this.currentEvent;
  }

  public setCurrentEventId(eventId: number) {
    this.events
    .pipe(filter(res => res !== null), first())
    .subscribe((events) => {
      const event = events.find(el => el.id === eventId);
      this.currentEvent.next(event);
      this.themeService.applyTheme(event.theme, event.backgroundImage);
    });
  }

  public setCurrentEvent(event: Event) {
    this.currentEvent.next(event);
    this.themeService.applyTheme(event.theme, event.backgroundImage);
  }
}
