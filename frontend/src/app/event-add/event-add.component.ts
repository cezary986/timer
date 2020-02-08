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
    this.form = this.formBuilder.group({
      title: [null, [Validators.required]],
      date: [new Date(), [Validators.required]],
      time: [null, [Validators.required]],
    });
  }

  public onSubmit() {
    const event: Event = {
      id: null,
      title: this.form.value.title,
      date: this.form.value.date.getTime()
    };
    this.eventService.saveEvent(event).subscribe((res) => {
      this.dialogRef.close(res);
      this.dataStore.addEvent(res);
    });
  }

  public onCancelClick() {
    this.dialogRef.close();
  }
}
