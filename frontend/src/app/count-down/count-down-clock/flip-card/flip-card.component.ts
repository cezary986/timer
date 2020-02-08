import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-flip-card',
  templateUrl: './flip-card.component.html',
  styleUrls: ['./flip-card.component.scss']
})
export class FlipCardComponent implements OnInit {

  public number: number;
  @Input() set value(value: number) {
    this.updateValue(value);
  }

  private counter = 0;

  public prevNumber = this.counter;
  public nextNumber = this.counter;

  public animationTrigger = false;

  public time = 1000;

  constructor() { }

  ngOnInit() { }

  public updateValue(newValue: number) {
    this.counter++;
    //this.nextNumber = this.nextNumber + 1 === 10 ? 9 : this.nextNumber + 1;
    this.nextNumber = newValue;

    this.animationTrigger = true;
    setTimeout(() => {
      this.animationTrigger = false;
    }, 500);
    setTimeout(() => {

      // if (this.prevNumber === 9) {
      //   this.nextNumber = 0;
      //   this.prevNumber = 0;
      // } else {
      //   // this.prevNumber++;
       
      // }
      this.prevNumber = newValue
    }, (this.time / 4));
  }

}
