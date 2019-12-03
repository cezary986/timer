import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-flip-clock',
  templateUrl: './flip-clock.component.html',
  styleUrls: ['./flip-clock.component.scss']
})
export class FlipClockComponent implements OnInit {

  private number: number = null;

  public tensOfThousands = null;
  public thousands = null;
  public hundrets = null;
  public tens = 0;
  public units = 0;

  @Input() set value(value: number) {
    this.number = value;

    let tensOfThousands = null;
    let thousands = null;
    let hundrets = null;
    let tens = 0;
    let units = 0;

    units = Math.floor(value % 10);
    value -= units;
    if (value > 600) {
      console.log(value);
    }
    tensOfThousands = Math.floor((value) / 10000);
    value -= tensOfThousands * 10000;
    thousands = Math.floor((value) / 1000);
    value -= thousands * 1000;
    hundrets = Math.floor((value) / 100);
    value -= hundrets * 100;
    tens = Math.floor((value) / 10);
    value -= tens * 10;




    this.units = units === 10 ? 0 : units;
    this.tens = tens === 10 ? 0 : tens;
    this.hundrets = hundrets === 10 ? 0 : hundrets;
    this.thousands = thousands === 10 ? 0 : thousands;
    this.tensOfThousands = tensOfThousands === 10 ? 0 : tensOfThousands;
  }

  constructor() { }

  ngOnInit() {
  }

}
