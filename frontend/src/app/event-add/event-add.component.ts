import { Component, OnInit, Inject } from '@angular/core';
import { EventsService } from '../common/service/events.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Event } from '../common/models/event';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DataStoreService } from '../common/service/data-store.service';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.scss']
})
export class EventAddComponent implements OnInit {

  public mode: 'add' | 'edit';
  public form: FormGroup = null;

  constructor(
    private eventService: EventsService,
    private dataStore: DataStoreService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EventAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Event) {
    this.mode = (data === null || data === undefined) ? 'add' : 'edit';
  }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    let eventTime = null;
    if (this.data !== null) {
      const eventDate = new Date(this.data.date);
      eventTime = eventDate.getHours() + ':' +  eventDate.getMinutes();
    }
    this.form = this.formBuilder.group({
      title: [this.data !== null ? this.data.title : null, [Validators.required]],
      date: [this.data !== null ? new Date(this.data.date) : new Date(), [Validators.required]],
      time: [this.data !== null ? eventTime : null, [Validators.required]],
    });
  }

  public onSubmit() {
    const eventDate: Date = this.form.value.date;
    if (this.form.value.time !== null) {
      const tmp = this.form.value.time.split(':')
      const hours = Number.parseInt(tmp[0], 10);
      const minutes = Number.parseInt(tmp[1], 10);
      eventDate.setHours(hours);
      eventDate.setMinutes(minutes);
      eventDate.setSeconds(0);
    }

    const event: Event = {
      id: (this.data !== null) ? this.data.id : null,
      title: this.form.value.title,
      date: eventDate.getTime(),
      theme: null
    };
    if (this.mode === 'add') {
      this.eventService.saveEvent(event).subscribe((res) => {
        this.dialogRef.close(res);
        this.dataStore.addEvent(res);
      });
    }
    if (this.mode === 'edit') {
      this.eventService.updateEvent(event).subscribe((res) => {
        this.dialogRef.close(event);
        this.dataStore.updateEvent(event);
      });
    }
  }

  public onCancelClick() {
    this.dialogRef.close();
  }
}
