import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-order-summary',
    standalone: true,
    imports: [],
    templateUrl: './order-summary.component.html',
    styleUrl: './order-summary.component.css',
})
export class OrderSummaryComponent {
    @Input ()
    orderSummaryDetails?: any;
}
