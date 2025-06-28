import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    template: `
    <h1>Welcome to {{ title }}!</h1>
    <router-outlet/>
    @for (prod of productTitles; track $index) {
        <a routerLink="/details/{{$index}}">{{prod}}</a>
        <br>
    }
    `,
    imports: [RouterOutlet, RouterLink],
    styles: `* {padding: 10px}`
})
export class AppComponent {
    title = '08-routing-recap';

    productTitles = ['Product 1', 'Product 2', 'Product 3'];
}
