import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Event } from '../common/models/event';

@Component({
  selector: 'app-event-styling',
  templateUrl: './event-styling.component.html',
  styleUrls: ['./event-styling.component.scss']
})
export class EventStylingComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EventStylingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Event
  ) { }

  ngOnInit(): void {
  }

  public onDismiss() {
    this.dialogRef.close();
  }

  public onSubmit() {
    // TODO
    this.dialogRef.close();
  }

}
