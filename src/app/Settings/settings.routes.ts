// @App/Settings/settings.routes.ts

// https://angular.io/guide/router-tutorial-toh#child-route-configuration
// https://www.angulararchitects.io/en/blog/routing-and-lazy-loading-with-standalone-components/

import { Routes } from "@angular/router";

import { SettingsComponent } from "@App/Settings/Settings/SettingsComponent";
import { GeneralComponent } from "@App/Settings/General/GeneralComponent";
import { PersonalComponent } from "@App/Settings/Personal/PersonalComponent";

export const SETTINGS_ROUTES: Routes = [
    {
        path: "",
        component: SettingsComponent,
        // loadChildren: () => import("@App/Core/Dashboard/DashboardModule").then(module => module.DashboardModule),
        // canActivate: [AuthenticationGuard]
    },
    {
        path: "general",
        component: GeneralComponent
    },
    {
        path: "personal",
        component: PersonalComponent
    }


    // The code below didn't work.
    // path: "",
    // component: SettingsComponent,
    // // providers: [
    // //     // provideBookingDomain(config)
    // // ],
    // children: [
    //     // {
    //     //     path: "",
    //     //     // pathMatch: "full",
    //     //     component: SettingsComponent
    //     // },
    //     {
    //         path: "general",
    //         component: GeneralComponent
    //     },
    //     {
    //         path: "personal",
    //         component: PersonalComponent
    //     }
    // ]
];
