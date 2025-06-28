import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-root',
    standalone: true,
    template: `
        <article>
            <h1>Blog Post</h1>
            <section>
                <label for="title">Post Title</label>
                <input type="text" id="title" [(ngModel)]="title" />

                <label for="body">Post Body</label>
                <textarea id="body" [(ngModel)]="body"></textarea>
            </section>
            <section>
                <p>Display Title: {{title}}</p>
                <p>Display Body: {{body}}</p>
            </section>
        </article>
    `,
    imports: [FormsModule],
})
export class AppComponent {
    title = '';
    body = '';
    
    ngDoCheck() {
        console.log(`Title: ${this.title} Body: ${this.body}`);
    }
}
