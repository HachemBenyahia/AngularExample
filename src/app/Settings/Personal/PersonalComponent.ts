import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-personal",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./personal.html",
    styleUrl: "./personal.sass"
})
export class PersonalComponent {

    public constructor()
    {
        // alert("PersonalComponent");
    }
}
