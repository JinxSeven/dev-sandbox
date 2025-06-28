import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule],
    template: `
    <p>Click a link below!</p>
    `,
    styles: `* {padding: 10px}`,
})
export class HomeComponent {}
