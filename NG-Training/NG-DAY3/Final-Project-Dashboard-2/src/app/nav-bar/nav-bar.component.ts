import { Component } from '@angular/core';

@Component({
    selector: 'app-nav-bar',
    standalone: true,
    imports: [],
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
    navBtns = [
        { name: "Live Orders", icon: "fa-solid fa-boxes-stacked fa-xl" },
        { name: "Order History", icon: "fa-solid fa-bag-shopping fa-xl" },
        { name: "Offers", icon: "fa-solid fa-percent fa-xl" },
        { name: "Products", icon: "fa-solid fa-box-archive fa-xl" },
        { name: "Stock", icon: "fa-solid fa-boxes-packing fa-xl" },
        { name: "Message", icon: "fa-solid fa-message fa-xl" },
        { name: "Settings", icon: "fa-solid fa-gear fa-xl" }
    ];

}
