import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent {
    accName = "Lubomír Dvořák";
    profileDropDown = [
        { name: "Edit Details", icon: "fa-solid fa-pen" },
        { name: "Account Settings", icon: "fa-solid fa-user-gear" },
        { name: "Logout", icon: "fa-solid fa-right-from-bracket" },
    ]
}
