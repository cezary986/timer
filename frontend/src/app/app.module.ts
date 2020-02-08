import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppBarModule } from './app-bar/app-bar.module';
import { EventAddModule } from './event-add/event-add.module';
import { IgorModule } from './igor/igor.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material';
import localePl from '@angular/common/locales/pl';
import { registerLocaleData } from '@angular/common';
import { environment } from 'src/environments/environment';

registerLocaleData(localePl);

export function translationFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppBarModule,
    EventAddModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    EventAddModule,
    MatNativeDateModule,

    IgorModule.forRoot(environment.igorConfig),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translationFactory,
        deps: [HttpClient]
      },
    }),
  ],
  providers: [
  { provide: LOCALE_ID, useValue: 'pl' },
  { provide: MAT_DATE_LOCALE, useValue: 'pl' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private translateService: TranslateService,
  ) {
    this.translateService.setDefaultLang('pl');
    this.translateService.use('pl');
  }
}
