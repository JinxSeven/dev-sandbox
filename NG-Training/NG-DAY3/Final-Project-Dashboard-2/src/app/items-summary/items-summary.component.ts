import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
    selector: 'app-items-summary',
    standalone: true,
    imports: [],
    templateUrl: './items-summary.component.html',
    styleUrl: './items-summary.component.css',
})
export class ItemsSummaryComponent {
    @Input ()
    itemsSummaryData: any | null = null;
}
