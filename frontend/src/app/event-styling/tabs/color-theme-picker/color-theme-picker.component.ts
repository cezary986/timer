import { Component, OnInit } from '@angular/core';
import { ThemesService } from 'src/app/common/service/themes.service';
import { ColorTheme } from 'src/app/common/models/color-theme';
import { DataStoreService } from 'src/app/common/service/data-store.service';
import { Observable } from 'rxjs';
import { Event } from 'src/app/common/models/event';
import { EventsService } from 'src/app/common/service/events.service';
import { first, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-color-theme-picker',
  templateUrl: './color-theme-picker.component.html',
  styleUrls: ['./color-theme-picker.component.scss']
})
export class ColorThemePickerComponent implements OnInit {

  public themes: ColorTheme[] = null;

  public currentEvent: Observable<Event>;

  constructor(
    private dataStore: DataStoreService,
    private themesService: ThemesService,
    private eventService: EventsService
  ) {
    this.currentEvent = this.dataStore.getCurrentEvent();
  }

  ngOnInit(): void {
    this.themesService.getThemes().subscribe((themes) => {
      this.themes = themes;
    });
  }

  public onThemeSelect(theme: ColorTheme) {
    let currentEvent = null;
    this.currentEvent.pipe(
      first(),
      flatMap((event) => {
        event.theme = theme;
        currentEvent = event;
        return this.eventService.updateEvent(event);
      }))
      .subscribe((res) => {
        this.dataStore.setCurrentEvent(currentEvent);
      });
  }

}
