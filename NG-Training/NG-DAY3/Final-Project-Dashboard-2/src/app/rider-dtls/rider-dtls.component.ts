import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-rider-dtls',
    standalone: true,
    imports: [],
    templateUrl: './rider-dtls.component.html',
    styleUrl: './rider-dtls.component.css',
})
export class RiderDtlsComponent {
    @Input ()
    riderInformation: any | null = null
}
