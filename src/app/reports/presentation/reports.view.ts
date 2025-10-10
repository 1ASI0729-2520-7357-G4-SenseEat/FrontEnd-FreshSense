import { Component, computed, signal } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

type Day = { label: string; wasteKg: number };

@Component({
    selector: 'fs-reports-view',
    standalone: true,
    imports: [NgFor, FormsModule, TranslateModule], // ⬅️ agregado
    templateUrl: './reports.view.html',
    styleUrl: './reports.view.css'
})
export class ReportsView {
    fromDate = '2025-08-11';
    toDate = '2025-08-17';
    applyRange() { /* rango mock */ }

    private _days = signal<Day[]>([
        { label: 'Mon', wasteKg: 12 },
        { label: 'Tue', wasteKg: 18 },
        { label: 'Wed', wasteKg: 9 },
        { label: 'Thu', wasteKg: 14 },
        { label: 'Fri', wasteKg: 20 },
        { label: 'Sat', wasteKg: 16 },
        { label: 'Sun', wasteKg: 10 },
    ]);
    readonly days = computed(() => this._days());
    readonly maxWaste = Math.max(...this._days().map(d => d.wasteKg));

    gainPct = 12;
    lossPct = 3;
    improvementPct = 12;

    humidity = [70, 72, 68, 66, 71, 73, 69];
    temperature = [19, 21, 22, 20, 23, 24, 22].map(v => v * 4);

    width = 640; height = 220; pad = 28;
    xScale = (i: number) => this.pad + i * ((this.width - this.pad*2) / (this.humidity.length-1));
    yScale = (v: number) => this.height - this.pad - (v/100) * (this.height - this.pad*2);
    polyline = (arr: number[]) => arr.map((v, i) => `${this.xScale(i)},${this.yScale(v)}`).join(' ');
}
