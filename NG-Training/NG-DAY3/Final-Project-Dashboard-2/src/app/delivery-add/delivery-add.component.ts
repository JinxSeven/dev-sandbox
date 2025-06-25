import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-delivery-add',
    standalone: true,
    imports: [],
    templateUrl: './delivery-add.component.html',
    styleUrl: './delivery-add.component.css',
})
export class DeliveryAddComponent {
    @Input ()
    deliveryData?: any;
}
