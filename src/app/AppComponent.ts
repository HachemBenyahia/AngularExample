import { Component, ChangeDetectorRef } from "@angular/core";

// import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";

// https://stackoverflow.com/questions/47236963/no-provider-for-httpclient
import { FormsModule } from "@angular/forms";
// import { HttpModule } from "@angular/http";
// import { HttpClientModule } from "@angular/common/http";
import { RouterOutlet } from "@angular/router";

// import { NgModule } from "@angular/core";
// import { Input, EventEmitter, Output } from "@angular/core";

import { NgZone } from "@angular/core";

import { User } from "@App/Entity/User";
import { UserService } from "@App/Service/UserService";

/****************************************************************************************************************************

 Comme tout développeur j"ai droit à internet/stackoverflow/etc, mais je vais tenter de faire tout ça le plus rapidement possible.

 Durée effective (en concaténant les slots de code) ~ 10h (sachant que j'ai dû m'adapter à Angular 17, qui a enlevé les modules
 notamemnt ainsi que les fichiers de configuration associés, et je n'aime pas ou je ne comprends pas cette modification pour le moment).

- exercice 1: "Form avec un Pipe" (exercice de Daniel)
- exercice 2: création d"une Entity User et remplacer les données du form par celle de l"Entity (User)
- exercice 3: mise en place du serveur de test Express (au lieu d'un "vrai" serveur Symfony)
- exercice 4: création d"un Service UserService pour requêter l'API ExpressJS
- exercice 5: création d'un Module "Settings" avec une route /settings et deux sous-composants "General" et "Personal"
              accessibles via /settings/general et /settings/personal
- exercice 6: UserAuthenticator ? Plus le temps.

********************************************************************************************************************************/

@Component({
    selector: "app-root",
    standalone: true,

    // https://stackoverflow.com/questions/38886276/the-directive-ngmodel-not-working-anymore-in-rc5
    // https://stackoverflow.com/questions/38892771/cant-bind-to-ngmodel-since-it-isnt-a-known-property-of-input
    // ngModel requires FormsModule import.
    // "Importing" in Angular17 means both the import statement AND adding it in the imports array (except "Component" module).

    // For standalone component.
    imports: [CommonModule, RouterOutlet, FormsModule],

    templateUrl: "./app.html",
    styleUrl: "./app.sass"
})
export class AppComponent
{
    // public firstName: String;
    // public lastName: String;
    // public birthDate: Date;

    public submitted: boolean;
    public user: User;
    public users: User[];
    public updatedUsersTime: Date;
    private refreshRate: number = 3000;

    public refreshUsers() {
        this.userService.get()
            .subscribe({
                next: (users: User[]) => {
                    // console.log("Observable emitted the next value: ");
                    // console.log(user.serialize());
                    this.users = User.fromJSONArray(users);
                    console.log("this.userService.get()");
                    console.log(this.users);
                },
                error: (error: any) => {
                    // console.error("Observable emitted an error: " + error)
                },
                complete: () => {
                    // console.log("Observable emitted the complete notification")
                }
            });
    }

    public constructor(private userService: UserService, private _zone: NgZone, private ref: ChangeDetectorRef)
    //, private authenticationService: AuthenticationService))
    {
        this.user = new User(1, "Jean", "Dupont", new Date("06/12/2000 15:32:11"));

        // https://stackoverflow.com/questions/44947551/angular2-4-refresh-data-realtime
        // https://stackoverflow.com/questions/47261096/angular-setinterval-cause-component-to-non-stop-update-its-ui
        // https://stackoverflow.com/questions/53618090/render-time-based-observables-in-angular-without-overwhelming-change-detection

        // ERROR: TS2531: Object is possibly 'null'.
        // document.querySelector("a").on("click", function(event) {
        //     event.preventDefault();
        // }

        this.refreshUsers();
        this._zone.runOutsideAngular(() => {
            // This runs outside of the angular zone.

            setInterval(() => {
                this.refreshUsers();

        // https://stackoverflow.com/questions/53618090/render-time-based-observables-in-angular-without-overwhelming-change-detection
        // https://stackoverflow.com/questions/39511820/trigger-update-of-component-view-from-service-no-provider-for-changedetectorre

                this.ref.detectChanges();
                this.updatedUsersTime = new Date();
            }, this.refreshRate);

            this._zone.run(() => {
                // This runs inside the angular zone.
            });
        });

        this.userService.get(3)
            .subscribe({
                next: (user: User) => {
                    // console.log("Observable emitted the next value: ");
                    // console.log(user.serialize());
                    this.user = User.fromJSON(user);
                    console.log("this.userService.get(3)");
                    console.log(this.user);
                },
                error: (error: any) => {
                    // console.error("Observable emitted an error: " + error)
                },
                complete: () => {
                    // console.log("Observable emitted the complete notification")
                }
            });

        // this.firstName = "Jean";
        // this.lastName = "Dupont";
        // this.birthDate = new Date("06/12/2000 15:32:11");
        this.submitted = false;
    }

    public onSubmit()
    {
        // https://stackoverflow.com/questions/40349987/how-to-suppress-error-ts2533-object-is-possibly-null-or-undefined
        // https://stackoverflow.com/questions/12989741/the-property-value-does-not-exist-on-value-of-type-htmlelement
        console.log((<HTMLInputElement>document.querySelector("#form input[name='user.birthDate']"))!.value);

        this.user.birthDate = new Date((<HTMLInputElement>document.querySelector("#form input[name='user.birthDate']"))!.value);

        this.userService.post(this.user)
            .subscribe({
                next: (user: User) => {
                    // console.log("Observable emitted the next value: ");
                    // console.log(user.serialize());
                    // this.user = User.fromJSON(user);
                    console.log("this.userService.post(this.user)");
                    console.log(User.fromJSON(user));
                },
                error: (error: any) => {
                    // console.error("Observable emitted an error: " + error)
                },
                complete: () => {
                    // console.log("Observable emitted the complete notification")
                }
            });

        this.submitted = true;
    }
}
