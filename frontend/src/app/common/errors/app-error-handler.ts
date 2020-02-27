import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NotificationTypes } from '../const';

export class AppError extends Error {
    constructor(public code: string, message: string = null) {
        super(message);
    }
}

@Injectable()
export class AppErrorHandler implements ErrorHandler {

    constructor(
        private notifier: NotifierService,
        private translate: TranslateService,
        private zone: NgZone
    ) { }

    handleError(error) {
        this.zone.runOutsideAngular(() => {
            console.error(error);
            this.notifier.notify(NotificationTypes.ERROR, this.translate.instant('toasts.errors.app_error'));
        });
    }
}
