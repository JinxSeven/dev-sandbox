import { Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-posts',
    standalone: true,
    imports: [CommonModule],
    template: `
        @for(joke of jokesData; track joke.id) { @if (joke.type === "twopart") {
        <article class="post">
            <p class="title">{{ joke.category }}</p>
            <p class="body">{{ joke.setup }}</p><hr>
            <p class="body">{{ joke.delivery }}</p>
        </article>
        } @else {
        <article class="post">
            <p class="title">{{ joke.category }}</p>
            <p class="body">{{ joke.joke }}</p>
        </article>
        } }
    `,
    styles: `
    :host {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    .title {
        font-weight: bold;
        font-style: italic;
    }
    .body {
        font-style: italic;
    }
    .post {
        padding: 20px;
        border-radius: 5px;
        margin: 10px 0;
        background: white;
        box-shadow: 1px 5px 4px 2px #00000017;
        width: 400px;
    }
    `,
})
export class PostsComponent {
    protected jokesData: any[] = [];

    ngOnInit() {
        fetch('https://v2.jokeapi.dev/joke/Programming?amount=9')
        .then((response) => response.json())
        .then(data => {
            this.jokesData = data.jokes;
            console.log(this.jokesData);
        }).catch(error => console.error('Error:', error));
    }
}
