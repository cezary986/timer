import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * Komponent komunikatu o błędnie wypełnionym polu formularza.
 * Na Input error należy podać błędy kontrolki: FormControl.errors.
 */
@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss']
})
export class FormErrorComponent {

  public mErrors: any[];

  @Input() set errors(value: any[]) {
    if (value !== null && value !== undefined) {
      if (Array.isArray(value)) {
        this.mErrors = Array.from(value);
      } else {
        this.mErrors = [value];
      }
      this.mErrors = this.mErrors.map(error => {
        return {
          key: Object.keys(error)[0],
          payload: error[Object.keys(error)[0]]
        };
      });
    } else {
      this.mErrors = [];
    }
  }

  constructor(private translate: TranslateService) { }
}
