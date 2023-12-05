// import { Routes } from "@angular/router";
// export const routes: Routes = [];

// https://www.angulararchitects.io/en/blog/routing-and-lazy-loading-with-standalone-components/
// https://stackoverflow.com/questions/76577986/how-to-access-angular-16-routes-independently-for-standalone-components

import { Routes } from "@angular/router";
// import { AppComponent } from "@App/AppComponent";

export const APP_ROUTES: Routes = [
    // {
    //     path: "",
    //     component: AppComponent
    //     // pathMatch: "full",
    //     // redirectTo: "home"
    // },
    // {
    //     path: "home",
    //     component: AppComponent
    // },

    {
        path: "settings",
        loadChildren: () =>
            import("@App/Settings/settings.routes")
                .then(module => module.SETTINGS_ROUTES)
    },

    //     path: "settings",
    //     loadComponent: () =>
    //         import("@App/Settings/Settings/SettingsComponent")
    //             .then(m => m.SettingsComponent)
    // },
];

// https://angular.io/api/router/withDebugTracing
// bootstrapApplication(AppComponent,
//     {
//         providers: [
//             provideRouter(APP_ROUTES, withDebugTracing())
//         ]
//     }
// );
