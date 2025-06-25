import { Component } from '@angular/core';
import { Car } from './car';
import { ListingComponent } from './listing/listing.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [ListingComponent],
    template: `
        <h1>Saved Cars {{ savedCarList.length }}</h1>
        <section class="container">
            <!-- This article element represents and entire listing -->
            @for (car of carList; track car) {
            <app-listing
                [carInp]="car"
                (carSaved)="addCarToSaved($event)"
                [saveCarInp]="savedCarList"
            ></app-listing>
            }
            <!-- end car listing markup -->
        </section>
    `,
    styles: [],
})
export class AppComponent {
    savedCarList: Car[] = [];
    carList: Car[] = [
        {
            make: 'Toyota',
            model: 'Camery',
            miles: 54354,
            price: 1000,
            year: 2022,
            transmission: 'Automatic',
        },
        {
            make: 'Honda',
            model: 'Accord',
            miles: 100000,
            price: 230,
            year: 1991,
            transmission: 'Automatic',
        },
        {
            make: 'General Motors',
            model: 'Boke',
            miles: 100000,
            price: 230,
            year: 1991,
            transmission: 'Automatic',
        },
        {
            make: 'Ford',
            model: 'Focus',
            miles: 1,
            price: 22330,
            year: 2023,
            transmission: 'Automatic',
        },
    ];

    addCarToSaved(saveCar: Car) {
        this.savedCarList.push(saveCar);
    }
}
