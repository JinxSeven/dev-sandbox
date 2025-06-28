import { Component } from '@angular/core';
import {
    FormControl,
    FormControlName,
    FormGroup,
    ReactiveFormsModule,
} from '@angular/forms';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [ReactiveFormsModule],
    template: `
        <article>
            <h1>Blog Post</h1>
            <form
                name="blogForm"
                [formGroup]="blogForm"
                (ngSubmit)="handleFormSubmit()"
            >
                <section>
                    <label for="title">Post Title</label>
                    <input type="text" id="title" formControlName="blogTitle" />

                    <label for="body">Post Body</label>
                    <textarea
                        name=""
                        id="body"
                        cols="30"
                        rows="10"
                        formControlName="blogBody"
                    ></textarea>
                </section>
                <button type="submit">Submit Post</button>
            </form>
        </article>
    `,
    styles: [],
})
export class AppComponent {
    blogForm = new FormGroup({
        blogTitle: new FormControl(''),
        blogBody: new FormControl(''),
    });
    
    handleFormSubmit() {
        this.postBlog(
            this.blogForm.value.blogTitle,
            this.blogForm.value.blogBody
        );
    }

    postBlog(
        title: string | null | undefined,
        body: string | null | undefined
    ) {
        console.log(`Posting blog titles ${title}, with the contents ${body}.`);
    }
}
