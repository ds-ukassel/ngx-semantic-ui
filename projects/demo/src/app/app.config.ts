import {provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {SuiPopupConfig} from 'lib';
import {appRoutes} from './app.routing';

export const appConfig = {
  providers: [
    provideZoneChangeDetection(),
    provideRouter(appRoutes),
    SuiPopupConfig,
  ],
};
