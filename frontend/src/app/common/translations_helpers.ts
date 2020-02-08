import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';

export function setupModuleTranslations(
    translateService: any,
    translationsKey: string,
    languages: any,
    pathToi18 = './i18n/') {
    if (translateService.defaultLang != null && Object.entries(translateService.store.translations).length > 0) {
        putTranslationsToStore(translateService, pathToi18, translationsKey, languages);
    } else {
        translateService.store.onDefaultLangChange.pipe(first()).subscribe(a => {
            putTranslationsToStore(translateService, pathToi18, translationsKey, languages);
        });
    }
}

function putTranslationsToStore(
    translateService: TranslateService,
    pathToi18,
    translationsKey: string,
    languages: any) {

    if (translateService.store.translations[Object.keys(languages)[0]][translationsKey] === undefined) {
        Object.entries(languages).forEach(([languageName, translations]) => {
            try {
                translateService.store.translations[languageName][translationsKey] = translations;
            } catch (error) {
                console.error('Cannot setup "' + languageName + '" translations for key "' + translationsKey + '"');
            }
        });
    }
}
