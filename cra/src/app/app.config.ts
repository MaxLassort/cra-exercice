import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';


import {routes} from './app.routes';

import {provideStoreDevtools} from "@ngrx/store-devtools";
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {provideAnimations} from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideStoreDevtools({
      maxAge: 25, // conserve les 25 dernières actions
    }),
    {
      provide: MAT_DATE_LOCALE, useValue: 'fr'
    },
    provideAnimations()
  ],

};
