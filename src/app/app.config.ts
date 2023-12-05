import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";

import { APP_ROUTES } from "./app.routes";
import { provideClientHydration } from "@angular/platform-browser";

import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
    providers: [
        // https://angular.io/api/router/withDebugTracing
        // https://dev.to/manthanank/router-debugging-in-angular-4abd
        provideRouter(APP_ROUTES),// withDebugTracing()),
        provideClientHydration(),
        // https://blog.ninja-squad.com/2022/11/09/angular-http-in-standalone-applications/
        provideHttpClient(),
    ]
};
