import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
declare var ddsc: any;
@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  languageList: Observable<any>;
  defaultLanguage: string;
  allowLanguageList = [
    'en',
    'zh',
    'th',
    'vi'
  ];
  constructor(
    private translate: TranslateService,
  ) {

  }
  // 如果沒有設定語言 getBrowserLang -> langs -> en
  // 最壞的情況會設定英文不至於崩潰

  addLanguageList(obs: Observable<any>) {
    obs.subscribe(res => {
      const langs = res.map(element => {
        const strloc: string = element.locale_code.replace('_', '-');

        if (element.locale_code === 'en-GLOBAL') {
          element.locale_code = 'en';
        } else {
          element.locale_code = strloc;
        }
        return element.locale_code;
      });
      this.translate.addLangs(langs);
    });
  }

  settingLanguage(translate: TranslateService) {
    const languageCode = ddsc.admin.getLocaleSettings() ? ddsc.admin.getLocaleSettings().languageCode.split('-')[0] : 'en';
    return translate.use(languageCode);
  }

}
