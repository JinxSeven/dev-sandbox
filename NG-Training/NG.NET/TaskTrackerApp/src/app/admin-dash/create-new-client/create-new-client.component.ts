import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { GeneralDataService } from '../../services/general-data.service';

@Component({
    standalone: true,
    selector: 'app-create-new-client',
    imports: [ FormsModule, CommonModule, SelectModule ],
    templateUrl: './create-new-client.component.html',
    styleUrl: './create-new-client.component.css',
})
export class CreateNewClientComponent {
    dataServe = inject(GeneralDataService);
    selectedCountry: { name: string; code: string; } | undefined;

    onAddClient(clientForm: NgForm) {
        throw new Error('Method not implemented.');
    }
}
