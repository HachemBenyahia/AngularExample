import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-general",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./general.html",
    styleUrl: "./general.sass"
})
export class GeneralComponent {

    public constructor()
    {
        // alert("GeneralComponent");
    }
}
