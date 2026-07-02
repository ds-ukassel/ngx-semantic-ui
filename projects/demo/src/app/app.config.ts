import {provideRouter} from '@angular/router';
import {SuiPopupConfig} from '@angular-ex/semantic-ui';
import {appRoutes} from './app.routing';

export const appConfig = {
  providers: [
    provideRouter(appRoutes),
    SuiPopupConfig,
  ],
};
