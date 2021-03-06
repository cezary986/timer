import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventAddComponent } from './event-add/event-add.component';
import { StateService } from './common/service/state.service';
import { DataStoreService } from './common/service/data-store.service';
import { map } from 'rxjs/operators';
require('typeface-roboto');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'timer';

  constructor(
    public dialog: MatDialog,
    private stateService: StateService,
    private dataStoreService: DataStoreService) {
    this.stateService.getState()
      .pipe((map((state) => {
        if (state.eventId !== null) {
          this.dataStoreService.setCurrentEventId(state.eventId);
        }
        return;
      }))).subscribe((res) => { });
  }

  public onAddNewEventClick() {
    const dialogRef = this.dialog.open(EventAddComponent, {
      data: null
    });
  }
}
