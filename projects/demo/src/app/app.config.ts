import {provideRouter} from '@angular/router';
import {SuiPopupConfig} from 'lib';
import {appRoutes} from './app.routing';

export const appConfig = {
  providers: [
    provideRouter(appRoutes),
    SuiPopupConfig,
  ],
};
