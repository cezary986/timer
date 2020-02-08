import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormErrorComponent } from './form-error.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { setupModuleTranslations } from '../../utils/translations_helpers';
import { PL_TRANSLATIONS } from './i18n/pl';
import { ToArrayPipeModule } from '../../pipes/to-array-pipe/to-array-pipe.module';


@NgModule({
  declarations: [
    FormErrorComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    ToArrayPipeModule,
  ],
  exports: [
    FormErrorComponent
  ]
})
export class FormErrorModule {
  constructor(
    private translate: TranslateService
  ) {
    setupModuleTranslations(
      translate,
      'forms_errors',
      {
        pl: PL_TRANSLATIONS
      }
    );
  }
}
