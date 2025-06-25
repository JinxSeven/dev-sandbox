import { Component, EventEmitter, Output } from '@angular/core';
import { PostsComponent } from './posts/posts.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [PostsComponent],
    template: `
        <section class="container">
            <h1 style="font-style: italic">Deferrable Views Example</h1>
            <button style="margin-top: 15px; font-style: italic" #loadPosts>Load Jokes</button>
            @defer (on interaction(loadPosts)) {
                <app-posts />
            } @placeholder (minimum 750ms) {
                <p style="font-style: italic; margin-top: 15px;">Click the above button to load funny jokes!</p>
            } @loading (minimum 5s) {
                <img src="../assets/1479.gif" alt="Loading..." style="margin-top: 15px;">
            }
        </section>
    `,
})
export class AppComponent { }
