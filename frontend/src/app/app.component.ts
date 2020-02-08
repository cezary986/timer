import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventAddComponent } from './event-add/event-add.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'timer';

  constructor(public dialog: MatDialog) {
    
  }

  public onAddNewEventClick() {
    const dialogRef = this.dialog.open(EventAddComponent, {
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
