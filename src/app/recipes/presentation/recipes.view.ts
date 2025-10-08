import { Component } from '@angular/core';

@Component({
    selector: 'fs-recipes-view',
    standalone: true,
    template: `
        <section class="stub">
            <h2>Recipes</h2>
            <p>Coming soon…</p>
            <ul class="bullets">
                <li>Suggest recipes based on inventory</li>
                <li>Recipe cards (e.g., Waffles, Fruit Salad)</li>
                <li>Filters: level, diet, time</li>
            </ul>
        </section>
    `,
    styles: [`
        :host .stub{background:#fff;border:1px solid #e6ece8;border-radius:16px;padding:16px;}
        h2{margin:0 0 8px;}
        .bullets{margin-top:8px;color:#6b7f7b}
    `]
})
export class RecipesView {}
