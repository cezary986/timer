import { Component } from '@angular/core';
import { EventsService } from 'src/app/common/service/events.service';
import { DataStoreService } from 'src/app/common/service/data-store.service';
import { map, flatMap, first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Event } from 'src/app/common/models/event';

@Component({
  selector: 'app-event-background',
  templateUrl: './event-background.component.html',
  styleUrls: ['./event-background.component.scss']
})
export class EventBackgroundComponent {

  public isEditing = false;
  public backgroundImageUrl = this.dataStore.getCurrentEvent()
    .pipe(map((event: Event) => {
      if (event !== null && event.backgroundImage !== null &&  event.backgroundImage !== undefined) {
        return `${environment.fileServerAddress}/${event.backgroundImage}`;
      } else {
        return null;
      }
    }));

  constructor(
    private dataStore: DataStoreService,
    private eventService: EventsService,
  ) { }


  public onFileSelect(files) {
    if (files[0] !== undefined) {
      this.dataStore.getCurrentEvent()
        .pipe(first(), (flatMap((event) => {
          return this.eventService.setEventBackgroundImage(event, files[0]);
        })), first())
        .subscribe((res) => {
          this.isEditing = false;
        });
    }
  }

  public onDeleteBackgroundClick() {
    this.dataStore.getCurrentEvent()
      .pipe(first(), flatMap((event) => {
        event.backgroundImage = null;
        return this.eventService.removeEventBackground(event);
      }))
      .subscribe((res) => {});
  }
}
