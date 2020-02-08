import { Injectable } from '@angular/core';
import { Event } from '../models/event';
import { Observable } from 'rxjs';
import { IgorService } from 'src/app/igor/igor.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private actions = {
    GET_EVENTS: 'get_events',
    ADD_EVENT: 'add_event',
    REMOVE_EVENT: 'delete_event',
    UPDATE_EVENT: 'update_event',
  };

  constructor(
    private igorService: IgorService
  ) { }

  public getEvents(): Observable<Event[]> {
    return this.igorService.dispatch<Event[]>(this.actions.GET_EVENTS);
  }

  public saveEvent(event: Event): Observable<Event> {
    return this.igorService.dispatch<Event>(this.actions.ADD_EVENT, event);
  }

  public removeEvent(event: Event): Observable<void> {
    return this.igorService.dispatch<void>(this.actions.REMOVE_EVENT);
  }
}
