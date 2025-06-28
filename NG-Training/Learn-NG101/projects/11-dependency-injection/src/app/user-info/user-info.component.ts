import { Component, inject, Input } from '@angular/core';
import { User } from '../data';
import { UserService } from '../user.service';

@Component({
    selector: 'app-user-info',
    standalone: true,
    template: `
        <p>{{ user.id }} - {{ user.email }}</p><br>
        <p>{{ user.address.street }} - {{ user.address.zipcode }}</p><br>
        <p>{{ user.address.city }} - {{ user.address.geo.lat }}</p><br>
        <p>{{ user.website }} - {{ user.address.geo.lng }}</p><br>
        <p>{{ user.id }} - {{ user.company.name }}</p><br>
    `,
    styles: ``,
})
export class UserInfoComponent {
    // Test user data
    @Input() user: User = {
        id: -1,
        name: 'Ervin Howell',
        username: 'Antonette',
        email: 'Shanna@melissa.tv',
        address: {
            street: 'Victor Plains',
            suite: 'Suite 879',
            city: 'Wisokyburgh',
            zipcode: '90566-7771',
            geo: {
                lat: '-43.9509',
                lng: '-34.4618',
            },
        },
        phone: '010-692-6593 x09125',
        website: 'anastasia.net',
        company: {
            name: 'Deckow-Crist',
            catchPhrase: 'Proactive didactic contingency',
            bs: 'synergize scalable supply-chains',
        },
    };
}
