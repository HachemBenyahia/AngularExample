import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-settings",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./settings.html",
    styleUrl: "./settings.sass"
})
export class SettingsComponent {

    public constructor()
    {
        // alert("SettingsComponent");
    }
}
