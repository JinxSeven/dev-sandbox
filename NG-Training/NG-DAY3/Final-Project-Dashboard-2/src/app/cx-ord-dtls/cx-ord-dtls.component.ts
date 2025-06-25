import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-cx-ord-dtls',
    standalone: true,
    imports: [],
    templateUrl: './cx-ord-dtls.component.html',
    styleUrl: './cx-ord-dtls.component.css',
})
export class CxOrdDtlsComponent {
    @Input ()
    cxOrdDetails: any | null = null;
}
