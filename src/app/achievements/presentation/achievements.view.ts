import { Component, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

type Achievement = { icon: string; title: string; desc: string; progress?: number };

@Component({
    selector: 'fs-achievements-view',
    standalone: true,
    imports: [NgFor, NgIf],
    templateUrl: './achievements.view.html',
    styleUrl: './achievements.view.css'
})
export class AchievementsView {
    private _upcoming = signal<Achievement[]>([
        { icon: '🥗', title: 'Green Saver', desc: 'Keep leafy greens under ideal humidity for 7 days.', progress: 60 },
        { icon: '🧊', title: 'Cold Master', desc: 'Keep average temp below 6°C for 5 consecutive days.', progress: 35 },
        { icon: '🍎', title: 'Fruit Care', desc: 'Avoid bruising score over 90% for a full week.' },
        { icon: '🧼', title: 'Cleanliness Pro', desc: 'Keep cleanliness level above 85% for 10 days.', progress: 80 },
    ]);
    readonly upcoming = () => this._upcoming();
}
