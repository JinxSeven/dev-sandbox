import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Car } from '../car';

@Component({
    selector: 'app-listing',
    standalone: true,
    imports: [CommonModule],
    template: `
        <!-- listing markup goes here -->
        <article class="listing">
            <div class="image-parent">
                <img class="product-image" src="https://placehold.co/100x100" />
            </div>
            <section class="details">
                <p class="title">{{ carInp.make }} {{ carInp.model }}</p>
                <hr />
                <p class="detail">
                    <span>Year</span>
                    <span>{{ carInp.year }}</span>
                </p>
                <div class="detail">
                    <span>Transmission</span>
                    <span>{{ carInp.transmission }}</span>
                </div>
                <p class="detail">
                    <span>Mileage</span>
                    <span>{{ carInp.miles }}</span>
                </p>
                <p class="detail">
                    <span>Price</span>
                    <span>{{ carInp.price }}</span>
                </p>
                <button (click)="handleCarSaved()">Save Car</button>
            </section>
            <div>
                <h3>Saved Cars</h3>
                <p class="detail">
            @for (savedCar of saveCarInp; track savedCar) {
                <span>{{ savedCar.model }}</span>
            } @empty {
                <span>No cars saved!</span>
            }
                </p>
            </div>
        </article>
    `,
    styles: ``,
})
export class ListingComponent {
    @Input() carInp!: Car;
    @Output() carSaved = new EventEmitter<Car>();
    @Input() saveCarInp!: Car[];

    handleCarSaved() {
        this.carSaved.emit(this.carInp);
    }
}
