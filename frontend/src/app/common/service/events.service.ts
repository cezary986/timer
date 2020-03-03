import { Injectable } from '@angular/core';
import { Event } from '../models/event';
import { Observable } from 'rxjs';
import { IgorService } from 'src/app/igor/igor.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, flatMap } from 'rxjs/operators';
import { DataStoreService } from './data-store.service';
import { ThemesService } from './themes.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private readonly BACKGROUND_FILE_DIR = 'resources';

  private actions = {
    GET_EVENTS: 'events.get',
    ADD_EVENT: 'events.add',
    REMOVE_EVENT: 'events.delete',
    UPDATE_EVENT: 'events.update',
    CHANGE_BACKGROUND: 'events.set_background_image'
  };

  constructor(
    private igorService: IgorService,
    private http: HttpClient,
    private dataStore: DataStoreService,
    private themeService: ThemesService
  ) { }

  public getEvents(): Observable<Event[]> {
    return this.igorService.dispatch<Event[]>(this.actions.GET_EVENTS);
  }

  public saveEvent(event: Event): Observable<Event> {
    return this.igorService.dispatch<Event>(this.actions.ADD_EVENT, event);
  }

  public updateEvent(event: Event): Observable<void> {
    return this.igorService.dispatch<void>(this.actions.UPDATE_EVENT, event);
  }

  public removeEvent(eventId: number): Observable<void> {
    return this.igorService.dispatch<void>(this.actions.REMOVE_EVENT, eventId);
  }


  public setEventBackgroundImage(event: Event, imageFile: File): Observable<void> {
    const fileName = 'event-' + event.id + '-' + (new Date().getTime().toString()) + '-bg.jpg';
    return this.http.post(`${environment.fileServerAddress}/${this.BACKGROUND_FILE_DIR}/${fileName}`, imageFile)
      .pipe((flatMap((res) => {
        const result = this.igorService.dispatch<void>(
          this.actions.CHANGE_BACKGROUND,
          { eventId: event.id, filePath: `resources/${fileName}` });
        event.backgroundImage = `${this.BACKGROUND_FILE_DIR}/${fileName}`;
        this.dataStore.setCurrentEvent(event);
        return result;
      })));
  }

  public removeEventBackground(event: Event): Observable<void> {
    return this.igorService.dispatch<void>(
      this.actions.CHANGE_BACKGROUND,
      { eventId: event.id, filePath: null })
      .pipe(map((res) => {
        event.backgroundImage = null;
        this.dataStore.setCurrentEvent(event);
      }));
  }
}
