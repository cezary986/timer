import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flip-card',
  templateUrl: './flip-card.component.html',
  styleUrls: ['./flip-card.component.scss']
})
export class FlipCardComponent implements OnInit {

  private counter = 0;

  public prevNumber = this.counter;
  public nextNumber = this.counter;

  public animationTrigger: boolean = false;

  public time = 1000;

  constructor() { }

  ngOnInit() {
    setInterval(() => {

      this.counter++;
      this.nextNumber = this.nextNumber + 1 === 10 ? 9 : this.nextNumber + 1;

      this.animationTrigger = true;
      setTimeout(() => {
        this.animationTrigger = false;
      }, 500);
      setTimeout(() => {

        if (this.prevNumber === 9) {
          this.nextNumber = 0;
          this.prevNumber = 0;
        } else {
          this.prevNumber++;
        }
      }, (this.time / 4));

    }, this.time);
  }

}
