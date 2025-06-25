import { Component, Input } from '@angular/core';
import { ItemsSummaryComponent } from '../items-summary/items-summary.component';
import { CxOrdDtlsComponent } from '../cx-ord-dtls/cx-ord-dtls.component';
import { RiderDtlsComponent } from '../rider-dtls/rider-dtls.component';
import { OrderSummaryComponent } from '../order-summary/order-summary.component';
import { TotalComponent } from '../total/total.component';
import { DeliveryAddComponent } from '../delivery-add/delivery-add.component';

@Component({
    selector: 'app-main-content',
    standalone: true,
    imports: [
        ItemsSummaryComponent,
        CxOrdDtlsComponent,
        RiderDtlsComponent,
        OrderSummaryComponent,
        TotalComponent,
        DeliveryAddComponent
    ],
    templateUrl: './main-content.component.html',
    styleUrl: './main-content.component.css',
})

export class MainContentComponent {
    ordNum = 256894

    itemsSummaryInfo = [
        {
            name: "Chocolate Milkshake",
            quant: " 1",
            price: "150",
            total: "150"
        },
        {
            name: "Chocolate Milkshake",
            quant: " 2",
            price: "7.5",
            total: "15"
        },
        {
            name: "Finish Washer Large 3Kg",
            quant: " 3",
            price: "70",
            total: "210"
        }
    ]

    cxOrdInfo = [
        {
            rhs: "Customer Name",
            lhs: "Harun Lbili"
        },
        {
            rhs: "Phone Number",
            lhs: "7918881829"
        },
        {
            rhs: "Bag Option",
            lhs: "No Bag"
        },
        {
            rhs: "Type",
            lhs: "Delivery"
        },
        {
            rhs: "Note",
            lhs: "N/A"
        },
    ]

    riderData = [
        {
            name: "Robart Suvent",
            imageSrc: "images/rider.png"
        }
    ]

    orderSummaryData = [
        { lhs: "Order Created", rhs: "Sun, May 7, 2021" },
        { lhs: "Order Time", rhs: "06:24 AM" },
        { lhs: "Subtotal", rhs: "£375.00" },
        { lhs: "Delivery Fee", rhs: "£0.00" }
    ]

    totalData = 375.00;

    deliveryInfo = [
        { lhs: "Address line", rhs: "14 Anglesey Road" },
        { lhs: "Flat/Building Name", rhs: "James Court" },
        { lhs: "Street Name", rhs: "Anglesey Road" },
        { lhs: "Postcode", rhs: "En3 4hy" }
    ]
}
