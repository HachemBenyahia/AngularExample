import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";

// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
// import { Input, EventEmitter, Output } from "@angular/core";
// import { ChangeDetectorRef } from "@angular/core";

import { User } from "@App/Entity/User";

/******************************************************
 Comme tout développeur j'ai droit à internet/stackoverflow/etc, mais je vais tenter de faire tout ça en 1h maximum.

- exercice 1: "Form avec un Pipe" (Daniel)
- exercice 2: création d'une Entity User et remplacer les données du form par celle de l'Entity (User)
- exercice 3: mise en place du serveur de test Express
- exercice 4: création d'un Service UserService pour requêter l'API Express
- exercice 5: création d'un Module et déplacement du Component vers ce Module et adapter RoutingModule correspondant.
- exercice 6: UserAuthenticator ?

En espérant avoir fait mes preuves pour le poste.

****************************************************/






@Component({
    selector: "app-root",
    standalone: true,
    // https://stackoverflow.com/questions/38886276/the-directive-ngmodel-not-working-anymore-in-rc5
    // https://stackoverflow.com/questions/38892771/cant-bind-to-ngmodel-since-it-isnt-a-known-property-of-input
    // ngModel requires FormsModule import
    // "Importing" in Angular means both the import statement AND adding it in the imports array (except "Component" module).
    imports: [CommonModule, RouterOutlet, FormsModule],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.sass"
})
export class AppComponent {
    // public firstName: String;
    // public lastName: String;
    // public birthDate: Date;

    public submitted: boolean;
    public user: User;

    public constructor()
    {
        this.user = new User("Jean", "Dupont", new Date("06/12/2000 15:32:11"));

        // this.firstName = "Jean";
        // this.lastName = "Dupont";
        // this.birthDate = new Date("06/12/2000 15:32:11");
        this.submitted = false;
    }

    public onSubmit()
    {
        this.submitted = true;
    }
}
