import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-greetings',
    template: `<p>Hello dear learner 👋🏾</p>`,
    standalone: true,
    imports: [RouterModule]
})
export class GreetingsComponent {}
