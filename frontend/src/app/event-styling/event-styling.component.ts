import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Event } from '../common/models/event';

@Component({
  selector: 'app-event-styling',
  templateUrl: './event-styling.component.html',
  styleUrls: ['./event-styling.component.scss']
})
export class EventStylingComponent {

  constructor(
    public dialogRef: MatDialogRef<EventStylingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Event
  ) { }

  public onDismiss() {
    this.dialogRef.close();
  }

  public onSubmit() {
    this.dialogRef.close();
  }

}
